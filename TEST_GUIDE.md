# Quick Test Guide - Keyboard Shortcuts & Admin

## 🧪 Testing Checklist

### Part 1: Keyboard Shortcuts in Canvas Editor

#### Setup
1. Go to `/editor` in your browser
2. Start a new portfolio or load existing one
3. Switch to "Custom Design" template (if not already there)

#### Test Cases

**✓ Undo/Redo**
- [ ] Add a text element to canvas
- [ ] Press **Ctrl+Z** (or **Cmd+Z**) → Element should disappear
- [ ] Press **Ctrl+Y** (or **Cmd+Y**) → Element should reappear
- [ ] Try **Ctrl+Shift+Z** → Should also redo

**✓ Copy/Paste**
- [ ] Add a text element
- [ ] Click to select it
- [ ] Press **Ctrl+C** → Copy to clipboard
- [ ] Press **Ctrl+V** → Should paste new element (slightly offset)
- [ ] Press **Ctrl+V** again → Should paste another copy

**✓ Duplicate**
- [ ] Select an element
- [ ] Press **Ctrl+D** → Should create identical duplicate
- [ ] Verify duplicates have different IDs in store

**✓ Arrow Keys Movement**
- [ ] Select any element
- [ ] Press **↑** → Should move up by 1px
- [ ] Press **Shift+↑** → Should move up by 10px
- [ ] Try **←**, **→**, **↓** with and without Shift
- [ ] Verify position changes in properties panel

**✓ Delete**
- [ ] Select an element
- [ ] Press **Delete** or **Backspace** → Element should be removed
- [ ] Verify undo still works after delete

**✓ Deselect**
- [ ] Select an element (see blue outline)
- [ ] Press **Escape** → Selection should clear
- [ ] Outline should disappear

**✓ Save (Ctrl+S)**
- [ ] Make changes to portfolio (edit text, move elements)
- [ ] Press **Ctrl+S** (or **Cmd+S**)
- [ ] Should see "Saved successfully" message
- [ ] Message should disappear after 3.5 seconds

**✓ Help Modal**
- [ ] Click the **Help** button (? icon) in the toolbar
- [ ] Modal should appear showing all shortcuts
- [ ] Click **X** to close modal
- [ ] Verify shortcuts listed match actual implementations

---

### Part 2: Admin Panel Access

#### Setup
1. Ensure you have Firebase auth working
2. Make sure `.env.local` has admin email configured:
   ```
   NEXT_PUBLIC_ADMIN_EMAIL=your-admin-email@example.com
   ```

#### Test Cases

**✓ Authorized Access**
- [ ] Login with admin-authorized email
- [ ] Navigate to `/admin`
- [ ] Should see "Community Template Review" heading
- [ ] Should see stats cards (Pending, Approved, Rejected counts)
- [ ] Should see list of templates

**✓ Unauthorized Access**
- [ ] Login with non-admin email
- [ ] Navigate to `/admin`
- [ ] Should see "Access Denied" message
- [ ] Should have options to "Go Home" or "Browse Templates"
- [ ] Should NOT see any templates or admin features

**✓ Admin Features**
- [ ] Check **Filter tabs** (pending, all, approved, rejected)
- [ ] Click each filter to verify templates update
- [ ] Click **Preview** on a template
- [ ] Preview modal should show template design
- [ ] Try **Approve** button → Status should change
- [ ] Try **Reject** button → Status should change

**✓ Template Submission**
- [ ] Create a custom design in editor
- [ ] Click **Share** button
- [ ] Fill out "Share Design" form
- [ ] Click **Submit Template**
- [ ] Navigate to admin panel
- [ ] New template should appear in pending list

---

### Part 3: Design Persistence

#### Setup
1. Go to `/editor`
2. Start fresh or load portfolio

#### Test Cases

**✓ Manual Save**
- [ ] Change portfolio name in Profile tab
- [ ] Click **Save Changes** button
- [ ] Verify "Saved successfully" message
- [ ] Refresh page (F5)
- [ ] Portfolio name should still be there

**✓ Auto-Save**
- [ ] Click **Auto Save** toggle button
- [ ] See spinner animation
- [ ] Make changes (edit name, add project, etc.)
- [ ] Wait 5 seconds
- [ ] Spinner should continue, indicating auto-save
- [ ] Refresh page
- [ ] Changes should persist

**✓ Custom Elements Persistence**
- [ ] Switch to "Custom Design" template
- [ ] Add several elements (text, shapes, images)
- [ ] Position them around canvas
- [ ] Press **Ctrl+S** to save
- [ ] Note the portfolio ID in URL
- [ ] Refresh page or close/reopen
- [ ] All custom elements should be in same positions

**✓ Error Handling**
- [ ] Try to save with invalid slug (contains special chars)
- [ ] Should see error message
- [ ] Fix slug and save again
- [ ] Should save successfully

---

## 📊 Performance Checks

- [ ] Keyboard shortcuts respond instantly (no lag)
- [ ] Undo/redo works smoothly with 10+ actions
- [ ] Copy/paste doesn't duplicate the same ID
- [ ] Save completes within 2-3 seconds
- [ ] Auto-save doesn't interfere with editing
- [ ] Help modal opens/closes smoothly
- [ ] No console errors in browser DevTools

---

## ✅ Sign-Off

All tests passed:
- Date: _____________
- Tester: _____________
- Notes: _____________

If any test fails, please note which one and create an issue with:
1. Test name
2. Expected vs actual behavior
3. Browser/OS used
4. Steps to reproduce
