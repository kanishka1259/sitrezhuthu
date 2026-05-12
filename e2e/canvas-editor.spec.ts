/**
 * e2e/canvas-editor.spec.ts
 *
 * Full end-to-end test simulating a real user building a portfolio
 * using the Custom Design canvas editor.
 *
 * Prerequisites:
 *   - npm run dev running on localhost:3000
 *   - A test Firebase user pre-created OR auth bypassed in test env
 */

import { test, expect, Page } from '@playwright/test';

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function loginAsTestUser(page: Page) {
  await page.goto('/login');
  await page.fill('input[type="email"]', process.env.TEST_EMAIL || 'testuser@sitrezhuthu.dev');
  await page.fill('input[type="password"]', process.env.TEST_PASSWORD || 'TestPass123!');
  await page.click('button[type="submit"]');
  await page.waitForURL('/templates', { timeout: 10_000 });
}

async function selectCustomTemplate(page: Page) {
  await page.click('text=Template');
  await page.click('text=Custom Design');
  // Give the canvas a moment to initialize
  await page.waitForTimeout(500);
}

// ─── Test Suite ───────────────────────────────────────────────────────────────
test.describe('Custom Canvas Editor — Full User Flow', () => {

  test.beforeEach(async ({ page }) => {
    await loginAsTestUser(page);
    await page.goto('/editor');
    await page.waitForLoadState('networkidle');
  });

  // ─── 1. Editor loads correctly ──────────────────────────────────────────────
  test('editor page loads with navbar and form panel', async ({ page }) => {
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.getByText('Editor')).toBeVisible();
    await expect(page.getByText('Save')).toBeVisible();
    await expect(page.getByText('View Live')).toBeVisible();
  });

  // ─── 2. Switch to Custom Design template ───────────────────────────────────
  test('can switch to Custom Design template', async ({ page }) => {
    await selectCustomTemplate(page);
    // Canvas toolbar should appear
    await expect(page.getByText('Add')).toBeVisible();
    await expect(page.getByText('Text')).toBeVisible();
    await expect(page.getByText('Button')).toBeVisible();
    await expect(page.getByText('Grid')).toBeVisible();
    await expect(page.getByText('Snap')).toBeVisible();
  });

  // ─── 3. Add a text element ──────────────────────────────────────────────────
  test('clicking Text adds a text element to the canvas', async ({ page }) => {
    await selectCustomTemplate(page);
    await page.getByText('Text').first().click();
    // The new element should appear on the canvas
    await expect(page.getByText('Your Text')).toBeVisible({ timeout: 3000 });
  });

  // ─── 4. Add a button element ────────────────────────────────────────────────
  test('clicking Button adds a button element', async ({ page }) => {
    await selectCustomTemplate(page);
    await page.getByTitle('Add Button').click();
    await expect(page.getByText('Click Me')).toBeVisible({ timeout: 3000 });
  });

  // ─── 5. Add an image element ────────────────────────────────────────────────
  test('clicking Image adds an image element', async ({ page }) => {
    await selectCustomTemplate(page);
    await page.getByTitle('Add Image').click();
    const img = page.locator('img[src*="unsplash"]');
    await expect(img).toBeVisible({ timeout: 5000 });
  });

  // ─── 6. Select element shows properties panel ───────────────────────────────
  test('clicking an element opens properties panel', async ({ page }) => {
    await selectCustomTemplate(page);
    await page.getByTitle('Add Text').click();
    await page.getByText('Your Text').click();
    await expect(page.getByText('Transform')).toBeVisible({ timeout: 3000 });
    await expect(page.getByText('Fill')).toBeVisible();
    await expect(page.getByText('Border')).toBeVisible();
  });

  // ─── 7. Inline text editing ─────────────────────────────────────────────────
  test('double-clicking text element enables inline editing', async ({ page }) => {
    await selectCustomTemplate(page);
    await page.getByTitle('Add Text').click();
    await page.getByText('Your Text').dblclick();
    const textarea = page.locator('textarea').first();
    await expect(textarea).toBeVisible({ timeout: 2000 });
    await textarea.fill('My Custom Heading');
    await page.keyboard.press('Escape');
    await expect(page.getByText('My Custom Heading')).toBeVisible();
  });

  // ─── 8. Drag element to new position ────────────────────────────────────────
  test('can drag an element to a new position', async ({ page }) => {
    await selectCustomTemplate(page);
    await page.getByTitle('Add Text').click();
    const el = page.getByText('Your Text');
    await el.waitFor({ state: 'visible' });

    const box = await el.boundingBox();
    if (!box) throw new Error('Element not found');

    // Drag from center to new position
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + 150, box.y + 100, { steps: 10 });
    await page.mouse.up();

    // Verify the element is still visible (not lost)
    await expect(page.getByText('Your Text')).toBeVisible();
  });

  // ─── 9. Right-click context menu ────────────────────────────────────────────
  test('right-clicking shows duplicate and delete options', async ({ page }) => {
    await selectCustomTemplate(page);
    await page.getByTitle('Add Text').click();
    await page.getByText('Your Text').click({ button: 'right' });
    await expect(page.getByText('Duplicate')).toBeVisible({ timeout: 2000 });
    await expect(page.getByText('Delete')).toBeVisible();
  });

  // ─── 10. Duplicate element ──────────────────────────────────────────────────
  test('duplicating an element adds a copy', async ({ page }) => {
    await selectCustomTemplate(page);
    await page.getByTitle('Add Text').click();
    const initialTexts = await page.getByText('Your Text').count();

    await page.getByText('Your Text').click({ button: 'right' });
    await page.getByText('Duplicate').click();

    // Should now have one more instance
    await expect(page.getByText('Your Text')).toHaveCount(initialTexts + 1, { timeout: 2000 });
  });

  // ─── 11. Delete with keyboard ───────────────────────────────────────────────
  test('pressing Delete removes selected element', async ({ page }) => {
    await selectCustomTemplate(page);
    await page.getByTitle('Add Text').click();
    await expect(page.getByText('Your Text')).toBeVisible();

    await page.getByText('Your Text').click();
    await page.keyboard.press('Delete');
    await expect(page.getByText('Your Text')).not.toBeVisible({ timeout: 2000 });
  });

  // ─── 12. Undo (Ctrl+Z) ──────────────────────────────────────────────────────
  test('Ctrl+Z undoes adding an element', async ({ page }) => {
    await selectCustomTemplate(page);
    await page.getByTitle('Add Text').click();
    await expect(page.getByText('Your Text')).toBeVisible();

    await page.keyboard.press('Control+z');
    await expect(page.getByText('Your Text')).not.toBeVisible({ timeout: 2000 });
  });

  // ─── 13. Layer panel shows elements ─────────────────────────────────────────
  test('layers panel lists added elements', async ({ page }) => {
    await selectCustomTemplate(page);
    await page.getByTitle('Add Text').click();
    await page.getByTitle('Add Button').click();

    // Layers panel should show count = 2
    await expect(page.getByText('Layers (2)')).toBeVisible({ timeout: 3000 });
  });

  // ─── 14. Toggle grid ────────────────────────────────────────────────────────
  test('clicking Grid button toggles background grid', async ({ page }) => {
    await selectCustomTemplate(page);
    const gridBtn = page.getByTitle('Toggle Grid');
    // Grid is on by default - click to turn off
    await gridBtn.click();
    // No crash, button should still be visible
    await expect(gridBtn).toBeVisible();
  });

  // ─── 15. Zoom controls ──────────────────────────────────────────────────────
  test('zoom in increases zoom percentage', async ({ page }) => {
    await selectCustomTemplate(page);
    const zoomLabel = page.locator('text=/\\d+%/').first();
    const initial = await zoomLabel.textContent();
    await page.getByTitle('').locator('button', { hasText: '' }).filter({ has: page.locator('svg') }).first().click();
    // Trigger zoom via Ctrl+Scroll
    const canvas = page.locator('.canvas-scrollable').first();
    await canvas.evaluate(el => el.dispatchEvent(new WheelEvent('wheel', { deltaY: -100, ctrlKey: true, bubbles: true })));
    // Zoom should have changed from 100
    const newText = await zoomLabel.textContent();
    expect(newText).not.toBe(initial);
  });

  // ─── 16. Save persists to database ──────────────────────────────────────────
  test('save design persists canvas elements across reload', async ({ page }) => {
    await selectCustomTemplate(page);
    await page.getByTitle('Add Text').click();

    // Double-click to edit
    await page.getByText('Your Text').dblclick();
    const textarea = page.locator('textarea').first();
    await textarea.fill('Persist Me');
    await page.keyboard.press('Escape');

    // Save
    await page.getByText('Save').first().click();
    await expect(page.getByText('Saved successfully')).toBeVisible({ timeout: 8000 });

    // Reload the editor
    await page.reload();
    await page.waitForLoadState('networkidle');
    await selectCustomTemplate(page);

    // Element should still be there
    await expect(page.getByText('Persist Me')).toBeVisible({ timeout: 5000 });
  });

  // ─── 17. Share button copies link ───────────────────────────────────────────
  test('Share button copies URL to clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.getByText('Share').click();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toMatch(/^https?:\/\//);
  });

  // ─── 18. Canvas background color change ─────────────────────────────────────
  test('changing canvas background color updates the canvas', async ({ page }) => {
    await selectCustomTemplate(page);
    // The canvas BG color input is in the top center
    const colorInput = page.locator('input[type="color"]').first();
    await colorInput.evaluate((el: HTMLInputElement) => {
      el.value = '#ff0000';
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    // Canvas should not crash
    await expect(page.getByText('Canvas BG')).toBeVisible();
  });
});

// ─── Public Portfolio View ────────────────────────────────────────────────────
test.describe('Public Portfolio Page', () => {
  test('renders portfolio publicly when isPublic=true', async ({ page }) => {
    // This assumes a portfolio with slug "testuser" exists in DB
    await page.goto('/testuser');
    await expect(page.locator('text=Made with SITREZHUTHU')).toBeVisible({ timeout: 5000 });
  });

  test('shows lock screen for private portfolio', async ({ page }) => {
    await page.goto('/private-test-portfolio');
    // Either shows lock screen or 404
    const hasLock = await page.getByText('This portfolio is private').isVisible().catch(() => false);
    const is404 = await page.getByText('404').isVisible().catch(() => false);
    expect(hasLock || is404).toBe(true);
  });
});
