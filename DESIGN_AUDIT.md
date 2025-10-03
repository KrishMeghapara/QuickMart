# QuickMart Frontend Design Audit
## Complete Analysis of Colors, Fonts, and Hover Effects

---

## 🎨 **COLOR PALETTE**

### **Primary Brand Colors**
- **Brand Purple**: `#4C1D95` (Main brand color)
- **Brand Purple Light**: `#7C3AED` (Secondary brand)
- **Brand Gradient**: `linear-gradient(135deg, #4C1D95, #7C3AED)`

### **Accent Colors**
- **Accent Blue**: `#0EA5E9` (Primary accent)
- **Accent Blue Light**: `#38BDF8` (Secondary accent)
- **Accent Gradient**: `linear-gradient(135deg, #0EA5E9, #38BDF8)`

### **Success/Green Colors**
- **Success**: `#059669`
- **Success Dark**: `#047857`
- **Success Light**: `#10b981`
- **Success Background**: `#D1FAE5`
- **Success Gradient**: `linear-gradient(135deg, #10b981, #059669)`

### **Danger/Error Colors**
- **Danger**: `#B91C1C`
- **Danger Light**: `#ef4444`
- **Danger Background**: `#FECACA`
- **Danger Gradient**: `linear-gradient(135deg, #dc2626, #b91c1c)`

### **Warning Colors**
- **Warning**: `#D97706`
- **Warning Background**: `#FEF3C7`

### **Info Colors**
- **Info**: `#0EA5E9`
- **Info Background**: `#E0F2FE`

### **Neutral/Gray Colors**
- **Background**: `#F5F6FA`, `#f8fafc`, `#f9fafb`
- **Surface**: `#FFFFFF`
- **Border**: `#E2E8F0`, `#e5e7eb`, `#d1d5db`
- **Text Primary**: `#111827`, `#1f2937`, `#1e293b`
- **Text Secondary**: `#374151`, `#4b5563`
- **Muted**: `#6B7280`, `#64748b`, `#9ca3af`
- **Icon Color**: `#4B5563`

### **Header Specific Colors**
- **Header Primary**: `#667eea`
- **Header Secondary**: `#764ba2`
- **Header Accent**: `#3498db`
- **Header Light Text**: `#1f2937`
- **Header Subtle Text**: `#64748b`

### **Theme Colors (New Theme System)**
- **Primary Main**: `#2563eb`
- **Primary Light**: `#60a5fa`
- **Primary Dark**: `#1e40af`, `#1d4ed8`
- **Secondary Main**: `#059669`
- **Secondary Light**: `#10b981`
- **Secondary Dark**: `#047857`

### **Special Effect Colors**
- **Glass Effect**: `rgba(255,255,255,0.7)` to `rgba(255,255,255,0.25)`
- **Backdrop Blur**: Used with glass morphism
- **Overlay**: `rgba(76, 29, 149, 0.05)`

---

## 🔤 **TYPOGRAPHY & FONTS**

### **Font Families**
1. **Primary Font**: `'Inter'` (Body text, UI elements)
   - Weights: 300, 400, 500, 600, 700, 800, 900
   - Used for: All body text, buttons, inputs, general UI

2. **Heading Font**: `'Poppins'` (Headings, titles)
   - Weights: 600, 700
   - Used for: H1-H6, brand name, section titles

3. **Fallback Fonts**: 
   - `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

### **Font Sizes**
- **H1**: `3rem` (48px) - Desktop, `2.5rem` (40px) - Tablet, `2rem` (32px) - Mobile
- **H2**: `2.5rem` (40px) - Desktop, `2rem` (32px) - Tablet, `1.75rem` (28px) - Mobile
- **H3**: `2rem` (32px) - Desktop, `1.75rem` (28px) - Tablet, `1.5rem` (24px) - Mobile
- **H4**: `1.5rem` (24px)
- **H5**: `1.25rem` (20px)
- **H6**: `1rem` (16px)
- **Body**: `1rem` (16px)
- **Small**: `0.9rem` (14.4px), `0.85rem` (13.6px), `0.8rem` (12.8px)
- **Tiny**: `0.75rem` (12px), `0.7rem` (11.2px)

### **Font Weights**
- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Semi-Bold**: 600
- **Bold**: 700
- **Extra-Bold**: 800
- **Black**: 900

### **Line Heights**
- **Headings**: 1.1 - 1.5
- **Body**: 1.5 - 1.6
- **Tight**: 1.2 - 1.3
- **Loose**: 1.6

### **Letter Spacing**
- **Tight**: `-1px` (Large headings)
- **Normal**: `0px` (Body text)
- **Loose**: `-0.5px` (H2)

---

## 🎭 **HOVER EFFECTS**

### **Button Hover Effects**

#### **1. Global Button Hover**
- **Transform**: `translateY(-2px)` (Lifts up)
- **Box Shadow**: `0 8px 25px rgba(0, 0, 0, 0.15)` (Increases shadow)
- **Background**: Changes from light gradient to blue gradient
- **Border**: Changes to `#2563eb`
- **Transition**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- **Shine Effect**: Sliding gradient overlay from left to right

#### **2. Primary Button Hover**
- **Background**: `linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)`
- **Box Shadow**: `0 6px 16px rgba(0, 0, 0, 0.2)`
- **Transform**: `translateY(-2px)`

#### **3. Secondary Button Hover**
- **Background**: `linear-gradient(135deg, #047857 0%, #065f46 100%)`
- **Box Shadow**: Increases intensity

#### **4. Add to Cart Button Hover**
- **Background**: `#15803D` (Darker green)
- **Transform**: `scale(1.05)` (Grows 5%)
- **Box Shadow**: `0px 6px 15px rgba(22, 163, 74, 0.4)`
- **Shine Effect**: White gradient sweep

#### **5. Checkout Button Hover**
- **Transform**: `translateY(-3px) scale(1.02)`
- **Box Shadow**: `0 12px 35px rgba(102, 126, 234, 0.4)`
- **Shine Effect**: White gradient overlay

#### **6. See All Button Hover**
- **Transform**: `translateY(-2px) scale(1.03)`
- **Box Shadow**: Cyan glow effect
- **Shine Effect**: White gradient sweep

### **Card Hover Effects**

#### **1. Product Card Hover (Carousel)**
- **Transform**: `translateY(-10px) scale(1.03)` (Lifts and grows)
- **Box Shadow**: `0 16px 36px rgba(0,0,0,0.18)`
- **Image Scale**: `scale(1.08)` (Image zooms in)
- **Top Border**: Expands from left to right
- **Overlay**: Purple tint appears
- **Product Name**: Changes color to brand purple
- **Transition**: `300ms cubic-bezier(0.4, 0, 0.2, 1)`

#### **2. Product Card Hover (Grid)**
- **Transform**: `translateY(-8px)` (Lifts up)
- **Box Shadow**: `0 12px 32px rgba(37, 99, 235, 0.2)` (Blue glow)
- **Image Scale**: `scale(1.1)` (10% zoom)
- **Top Border**: Blue gradient line appears
- **Overlay**: Blue tint overlay
- **Transition**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

#### **3. Enhanced Card Hover**
- **Transform**: `translateY(-8px)`
- **Box Shadow**: `0 20px 50px rgba(0,0,0,0.15)`
- **Top Border**: Blue gradient expands
- **Overlay**: Blue gradient overlay fades in
- **Product Name**: Changes to blue `#2563eb`

#### **4. Cart Item Hover**
- **Transform**: `translateX(4px)` (Slides right)
- **Background**: `rgba(255, 255, 255, 0.9)` (Brightens)
- **Box Shadow**: `0 4px 15px rgba(0,0,0,0.08)`

### **Input/Form Hover Effects**

#### **1. Input Field Hover**
- **Border Color**: `#d1d5db` (Darker gray)
- **Background**: `rgba(248, 250, 252, 1)` (Solid white)
- **Box Shadow**: `0 4px 15px rgba(0, 0, 0, 0.05)`
- **Transform**: `translateY(-1px)` (Slight lift)

#### **2. Input Field Focus**
- **Border Color**: `#2563eb` (Blue)
- **Box Shadow**: `0 4px 15px rgba(37, 99, 235, 0.15)` (Blue glow)
- **Outline**: `3px solid rgba(37, 99, 235, 0.4)`
- **Outline Offset**: `2px`
- **Transform**: `translateY(-1px)`

### **Icon Button Hover Effects**

#### **1. Header Icon Button Hover**
- **Transform**: `translateY(-2px)` (Lifts up)
- **Box Shadow**: `0 8px 20px rgba(16,24,40,0.08)`
- **Background**: Stays same (surface color)

#### **2. Carousel Arrow Hover**
- **Transform**: `translateY(-50%) scale(1.1)` (Grows 10%)
- **Box Shadow**: Purple glow effect
- **Background**: Brand gradient
- **Color**: Changes to white
- **Border**: Becomes transparent

### **Link Hover Effects**

#### **1. Global Link Hover**
- **Color**: Changes to `#7C3AED` (Brand purple light)
- **Underline**: Expands from 0 to 100% width
- **Underline Style**: 2px gradient line
- **Transition**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

#### **2. Auth Link Button Hover**
- **Color**: `#1d4ed8` (Darker blue)
- **Border Bottom**: `2px solid #1d4ed8`
- **Background**: `none` (Transparent)

### **Special Hover Effects**

#### **1. Logo Container Hover**
- **Background**: `rgba(102, 126, 234, 0.1)` (Light purple tint)
- **Transform**: `scale(1.02)` (Slight grow)
- **Transition**: `all 0.3s ease`

#### **2. Interactive Section Hover**
- **Background**: `rgba(255, 255, 255, 0.5)` (Glass effect)
- **Backdrop Filter**: `blur(10px)`
- **Box Shadow**: `0 8px 32px rgba(0, 0, 0, 0.08)`
- **Transform**: `translateY(-4px)` (Lifts up)

#### **3. Scrollbar Thumb Hover**
- **Background**: `linear-gradient(180deg, #1e40af, #6d28d9)` (Darker gradient)

---

## 🎬 **ANIMATIONS**

### **Keyframe Animations**

1. **fadeIn**: Opacity 0 → 1
2. **fadeInUp**: Opacity 0 + translateY(40px) → Opacity 1 + translateY(0)
3. **slideUp**: Opacity 0 + translateY(30px) → Opacity 1 + translateY(0)
4. **slideDown**: Opacity 0 + translateY(-30px) → Opacity 1 + translateY(0)
5. **slideLeft**: Opacity 0 + translateX(30px) → Opacity 1 + translateX(0)
6. **slideRight**: Opacity 0 + translateX(-30px) → Opacity 1 + translateX(0)
7. **slideInRight**: Opacity 0 + translateX(100%) → Opacity 1 + translateX(0)
8. **scale**: Opacity 0 + scale(0.9) → Opacity 1 + scale(1)
9. **pulse**: Opacity 1 ↔ 0.7 (infinite)
10. **shimmer**: Background position -200% → 200% (infinite)
11. **spin**: Rotate 0deg → 360deg (infinite)
12. **expandWidth**: Width 0 → 100px
13. **productCardEntry**: Opacity 0 + translateY(30px) + scale(0.9) → Opacity 1 + translateY(0) + scale(1)

### **Animation Timings**
- **Fast**: 0.2s - 0.3s
- **Standard**: 0.4s - 0.6s
- **Slow**: 0.8s - 1s
- **Very Slow**: 1.5s - 3s (shimmer, pulse)

### **Easing Functions**
- **Standard**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Ease Out**: `ease-out`
- **Ease In Out**: `ease-in-out`
- **Linear**: `linear` (for infinite animations)

### **Staggered Animations**
- Product cards: 0.1s delay increments
- Cart items: 0.1s delay increments
- Sections: 0.1s - 0.2s delays

---

## 🎨 **SHADOW SYSTEM**

### **Box Shadows**
- **Soft Shadow**: `0 6px 16px rgba(0,0,0,0.05)`
- **Card Shadow**: `0 10px 28px rgba(0,0,0,0.06)`
- **Small**: `0 2px 8px rgba(0, 0, 0, 0.05)`
- **Medium**: `0 4px 15px rgba(0, 0, 0, 0.08)`
- **Large**: `0 8px 25px rgba(0, 0, 0, 0.12)`
- **XL**: `0 12px 35px rgba(0, 0, 0, 0.15)`
- **2XL**: `0 20px 50px rgba(0, 0, 0, 0.2)`

### **Glow Effects**
- **Purple Glow**: `0 6px 24px rgba(124, 58, 237, 0.45)`
- **Blue Glow**: `0 6px 24px rgba(14, 165, 233, 0.4)`
- **Green Glow**: `0 6px 24px rgba(5, 150, 105, 0.35)`
- **Cyan Glow**: Used for accent buttons
- **Red Glow**: `0 2px 8px rgba(220, 38, 38, 0.4)`

---

## 📐 **BORDER RADIUS SYSTEM**

- **Small**: `8px`, `12px`
- **Medium**: `16px`, `20px`
- **Large**: `24px`
- **Pill**: `50px`, `999px`
- **Circle**: `50%`

---

## 🎯 **TRANSITION SYSTEM**

### **Standard Transitions**
- **All Properties**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- **Transform**: `transform 0.3s ease`, `transform 0.4s ease`
- **Color**: `color 0.3s ease`
- **Background**: `background 0.3s ease`
- **Box Shadow**: `box-shadow 0.3s ease`
- **Opacity**: `opacity 0.3s ease`, `opacity 0.4s ease`
- **Border**: `border-color 0.3s ease`

### **Hover Transition Durations**
- **Fast**: 0.2s
- **Standard**: 0.3s
- **Slow**: 0.4s - 0.5s

---

## 🌈 **GRADIENT SYSTEM**

### **Brand Gradients**
1. **Primary Brand**: `linear-gradient(135deg, #4C1D95, #7C3AED)`
2. **Accent**: `linear-gradient(135deg, #0EA5E9, #38BDF8)`
3. **Success**: `linear-gradient(135deg, #10b981, #059669)`
4. **Danger**: `linear-gradient(135deg, #dc2626, #b91c1c)`
5. **Header**: `linear-gradient(135deg, #667eea, #764ba2)`
6. **Blue Theme**: `linear-gradient(135deg, #2563eb, #1d4ed8)`
7. **Green Theme**: `linear-gradient(135deg, #059669, #047857)`

### **Background Gradients**
1. **Page Background**: `linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%)`
2. **Card Background**: `linear-gradient(145deg, #ffffff, #f8fafc)`
3. **Glass Effect**: `linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.25))`
4. **Overlay**: `linear-gradient(135deg, rgba(37, 99, 235, 0.02), rgba(29, 78, 216, 0.02))`

### **Text Gradients**
- **Brand Text**: `linear-gradient(135deg, #2563eb, #1d4ed8)`
- **Success Text**: `linear-gradient(135deg, #059669, #047857)`
- **Header Text**: `linear-gradient(45deg, #667eea 0%, #764ba2 100%)`

---

## 📱 **RESPONSIVE BREAKPOINTS**

- **Mobile**: `max-width: 480px`, `max-width: 600px`
- **Tablet**: `max-width: 768px`, `max-width: 900px`
- **Desktop**: `max-width: 1200px`
- **Large Desktop**: `min-width: 1200px`

---

## 🎨 **SPECIAL EFFECTS**

### **Glass Morphism**
- **Background**: `rgba(248, 250, 252, 0.1)` to `rgba(248, 250, 252, 0.95)`
- **Backdrop Filter**: `blur(10px)` to `blur(20px)`
- **Border**: `1px solid rgba(226, 232, 240, 0.2)` to `rgba(255, 255, 255, 0.3)`

### **Shine/Shimmer Effects**
- **Gradient**: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)`
- **Animation**: Slides from left (-100%) to right (100%)
- **Duration**: 0.5s (hover) or 1.5s-3s (loading)

### **Radial Gradients (Background Patterns)**
- **Blue**: `radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.03) 0%, transparent 50%)`
- **Purple**: `radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.03) 0%, transparent 50%)`
- **Green**: `radial-gradient(circle at 40% 40%, rgba(22, 163, 74, 0.02) 0%, transparent 50%)`

---

## 🎯 **USAGE SUMMARY**

### **Most Used Colors**
1. **Primary**: `#2563eb`, `#4C1D95`, `#7C3AED`
2. **Success**: `#059669`, `#10b981`
3. **Text**: `#111827`, `#1f2937`, `#6b7280`
4. **Background**: `#f8fafc`, `#ffffff`

### **Most Used Hover Effects**
1. **Lift + Shadow**: `translateY(-2px)` + increased shadow
2. **Scale**: `scale(1.02)` to `scale(1.1)`
3. **Color Change**: Text/background color transitions
4. **Shine Effect**: Sliding gradient overlay

### **Most Used Fonts**
1. **Inter**: Body text, UI elements (400, 500, 600, 700)
2. **Poppins**: Headings, brand name (600, 700)

### **Most Used Transitions**
1. **All**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
2. **Transform**: `transform 0.3s ease`
3. **Box Shadow**: Increases on hover

---

## 📊 **COMPONENT-SPECIFIC STYLES**

### **Header**
- Colors: `#667eea`, `#764ba2`, `#3498db`
- Hover: Icon buttons lift up with shadow
- Glass effect with backdrop blur

### **Product Carousel**
- Colors: Brand gradient, success green
- Hover: Card lifts 10px, scales 1.03, image zooms 1.08
- Animations: Staggered entry, shine effect

### **Cart Drawer**
- Colors: Purple gradient header, green total
- Hover: Items slide right, buttons lift
- Animations: Slide in from right

### **Login Form**
- Colors: Blue gradients, purple accents
- Hover: Inputs lift, buttons scale
- Features: Glass morphism, gradient text

### **Product Grid**
- Colors: Blue theme, green success
- Hover: Cards lift 8px, blue glow shadow
- Animations: Fade in up with stagger

---

---

## 📦 **COMPONENT-SPECIFIC COLORS & STYLES (FROM JSX FILES)**

### **ProductGrid.jsx**
- **Loading Skeleton**: `#f0f0f0`, `#e0e0e0` (shimmer gradient)
- **Empty State Border**: `#e5e7eb` (dashed)
- **Empty State Background**: `#f9fafb`
- **Empty State Icon**: `#9ca3af`
- **Empty State Text**: `#374151`
- **Card Border**: `#e5e7eb`
- **Card Hover Border**: `#7c3aed` (purple)
- **Card Hover Transform**: `translateY(-4px)` on desktop
- **Card Hover Shadow**: `0 12px 40px rgba(0,0,0,0.15)`
- **Image Transform**: `scale(1.05)` on hover
- **Placeholder Background**: `#f3f4f6`
- **Placeholder Icon**: `#9ca3af`
- **Stock Chip (In Stock)**: `#10b981` (green)
- **Stock Chip (Out of Stock)**: `#ef4444` (red)
- **Quick View Button**: `rgba(124, 58, 237, 0.9)` → `#7c3aed` on hover
- **Product Name**: `#111827`
- **Price Color**: `#10b981` (green)
- **Add Button**: `linear-gradient(135deg, #7c3aed, #6d28d9)`
- **Add Button Hover**: `linear-gradient(135deg, #6d28d9, #5b21b6)` + `scale(1.05)`
- **Add Button Shadow**: `0 4px 12px rgba(124, 58, 237, 0.3)` → `0 6px 16px rgba(124, 58, 237, 0.4)`
- **Disabled Button**: `#d1d5db` background, `#9ca3af` text

### **CategoryPage.jsx**
- **Page Background**: `#f9fafb`
- **Breadcrumb Link**: `#6b7280`
- **Breadcrumb Active**: `#111827`
- **Header Title**: `#111827`
- **Filter Paper Border**: `#e5e7eb`
- **Filter Title**: `#111827`
- **Filter Subtitle**: `#374151`
- **Slider Color**: `#7c3aed` (purple)
- **Switch Checked**: `#7c3aed`
- **Chip Background**: `#f3f4f6`
- **Chip Text**: `#374151`
- **Filter Button**: `#7c3aed` border and text
- **Select Border**: `#d1d5db`
- **Select Text**: `#111827`
- **View Mode Active**: `#7c3aed` background, white text
- **View Mode Inactive**: Transparent background, `#7c3aed` text

### **ProductDetailPage.jsx**
- **Page Background**: `#f9fafb`
- **Breadcrumb Link**: `#6b7280`
- **Breadcrumb Active**: `#111827`
- **Product Name**: `#111827`
- **Category Chip**: `#e0e7ff` background, `#7c3aed` text
- **Price**: `#7c3aed` (purple)
- **Strikethrough Price**: `#9ca3af`
- **Delivery Chip**: `#dcfce7` background, `#16a34a` text
- **Quantity Border**: `#d1d5db`
- **Add to Cart Button**: `#7c3aed` → `#6d28d9` on hover
- **Wishlist Border**: `#d1d5db`
- **Wishlist Icon (Active)**: `#ef4444` (red)
- **Details Background**: `#f8fafc`
- **Details Text**: `#4b5563`

### **ProductReviews.jsx**
- **Average Rating**: `#7c3aed` (purple)
- **Star Color**: `#fbbf24` (yellow/gold)
- **Rating Bar Background**: `#f3f4f6`
- **Rating Bar Fill**: `#7c3aed`
- **Write Review Button**: `#7c3aed` → `#6d28d9` on hover
- **Avatar Background**: `#7c3aed`
- **Submit Button**: `#7c3aed` → `#6d28d9` on hover

### **LoginForm.jsx**
- **Brand Gradient**: `linear-gradient(45deg, #667eea 0%, #764ba2 100%)`
- **Feature Icon Colors**: 
  - Shopping: `#3b82f6` (blue)
  - Shipping: `#10b981` (green)
  - Security: `#f59e0b` (orange)
  - Rewards: `#8b5cf6` (purple)
- **Star Rating**: `#fbbf24` (gold)
- **Card Background**: `linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)`
- **Card Shadow**: `0 20px 60px rgba(0, 0, 0, 0.1)`
- **Submit Button**: `linear-gradient(45deg, #667eea 0%, #764ba2 100%)`
- **Submit Button Hover**: `linear-gradient(45deg, #5a67d8 0%, #6b46c1 100%)` + `translateY(-2px)`
- **Submit Button Shadow**: `0 4px 15px rgba(102, 126, 234, 0.4)` → `0 6px 20px rgba(102, 126, 234, 0.6)`
- **Disabled Button**: `linear-gradient(45deg, #cbd5e0 0%, #a0aec0 100%)`
- **Link Hover**: `rgba(102, 126, 234, 0.1)` background

### **RegisterForm.jsx**
- **Same colors as LoginForm** plus:
- **Password Strength Colors**:
  - Weak: `#ef4444` (red)
  - Fair: `#f59e0b` (orange)
  - Good: `#eab308` (yellow)
  - Strong: `#10b981` (green)
- **Stats Text**: Primary color for numbers
- **Submit Button Hover**: `linear-gradient(45deg, #5a6fd8 0%, #6a4190 100%)` + `translateY(-1px)`
- **Submit Button Shadow**: `0 8px 25px rgba(102, 126, 234, 0.3)`

### **ModernHero.jsx**
- **Background**: `linear-gradient(135deg, #2563eb 0%, #059669 100%)`
- **Overlay**: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)`
- **Text Color**: `white`
- **Button Background**: `white`
- **Button Text**: `#2563eb`
- **Button Hover**: `#f8fafc` + `translateY(-2px)`
- **Feature Card**: `rgba(255,255,255,0.15)` → `rgba(255,255,255,0.25)` on hover
- **Feature Card Hover**: `translateY(-4px)`

### **Theme.js (New Theme System)**
- **Primary Main**: `#2563eb`
- **Primary Light**: `#60a5fa`
- **Primary Dark**: `#1e40af`
- **Secondary Main**: `#059669`
- **Secondary Light**: `#10b981`
- **Secondary Dark**: `#047857`
- **Neutral Colors**: `#f8fafc` to `#0f172a` (10 shades)
- **Background Default**: `#f8fafc`
- **Background Paper**: `#ffffff`
- **Text Primary**: `#1e293b`
- **Text Secondary**: `#64748b`

---

## 🎨 **INLINE STYLES & SX PROPS ANALYSIS**

### **Common Hover Patterns in JSX**

1. **Button Hover with Lift**
   ```jsx
   '&:hover': {
     transform: 'translateY(-2px)',
     boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)'
   }
   ```

2. **Card Hover with Scale**
   ```jsx
   '&:hover': {
     transform: 'translateY(-4px)',
     boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
     borderColor: '#7c3aed'
   }
   ```

3. **Image Zoom on Hover**
   ```jsx
   transform: hoveredProduct === product.productID ? 'scale(1.05)' : 'scale(1)'
   ```

4. **Background Change on Hover**
   ```jsx
   '&:hover': {
     bgcolor: 'rgba(255,255,255,0.25)',
     transform: 'translateY(-4px)'
   }
   ```

5. **Icon Button Hover**
   ```jsx
   '&:hover': {
     backgroundColor: '#7c3aed'
   }
   ```

### **Transition Patterns**
- **Standard**: `transition: 'all 0.3s ease'`
- **Cubic Bezier**: `transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'`
- **Image Transform**: `transition: 'transform 0.3s ease'`
- **Width Transition**: `transition: 'width 0.3s ease'`

### **Border Radius Patterns**
- **Small**: `borderRadius: 1` (8px), `borderRadius: 2` (16px)
- **Medium**: `borderRadius: 3` (24px)
- **Large**: `borderRadius: 4` (32px)
- **Circle**: `borderRadius: '50%'`
- **Pill**: `borderRadius: '999px'`

### **Spacing Patterns (MUI Spacing)**
- **Tiny**: `mb: 0.5` (4px), `mb: 1` (8px)
- **Small**: `mb: 2` (16px), `p: 2` (16px)
- **Medium**: `mb: 3` (24px), `p: 3` (24px)
- **Large**: `mb: 4` (32px), `py: 4` (32px)
- **XL**: `py: 8` (64px), `py: 12` (96px)

---

## 🔍 **ADDITIONAL FINDINGS**

### **Fade Animations**
- Used extensively with `<Fade in={true} timeout={...}>`
- Timeouts: 300ms, 600ms, 800ms, 1000ms
- Staggered delays: `timeout={300 + index * 100}`

### **Conditional Styling**
- Active states change background and text colors
- Hover states tracked with `useState` for complex interactions
- Disabled states use muted colors (`#d1d5db`, `#9ca3af`)

### **Responsive Patterns**
- `{ xs: value1, sm: value2, md: value3 }`
- Mobile-first approach
- Hide/show elements: `display: { xs: 'none', md: 'block' }`

### **Glass Morphism Usage**
- `backdrop-filter: blur(10px)` or `blur(20px)`
- Semi-transparent backgrounds: `rgba(255,255,255,0.7)` to `rgba(255,255,255,0.9)`
- Border: `1px solid rgba(255, 255, 255, 0.2)`

### **Gradient Text**
- `background: 'linear-gradient(...)'`
- `backgroundClip: 'text'`
- `WebkitBackgroundClip: 'text'`
- `WebkitTextFillColor: 'transparent'`

### **Icon Colors**
- Default: `color: 'text.secondary'`
- Active: Matches theme color (`#7c3aed`, `#2563eb`)
- Success: `#10b981`
- Error: `#ef4444`
- Warning: `#f59e0b`

---

## 📊 **COMPLETE COLOR INDEX**

### **All Unique Colors Used (Alphabetically)**

**Blues:**
- `#0EA5E9`, `#0c4a6e`, `#1d4ed8`, `#1e3a8a`, `#1e40af`, `#2563eb`, `#38BDF8`, `#3498db`, `#3b82f6`, `#5a67d8`, `#60a5fa`, `#667eea`, `#bae6fd`, `#e0f2fe`, `#f0f9ff`

**Purples:**
- `#4C1D95`, `#5b21b6`, `#6b46c1`, `#6d28d9`, `#764ba2`, `#7c3aed`, `#8b5cf6`, `#e0e7ff`

**Greens:**
- `#047857`, `#059669`, `#065f46`, `#10b981`, `#15803D`, `#16a34a`, `#D1FAE5`, `#dcfce7`

**Reds:**
- `#B91C1C`, `#b91c1c`, `#dc2626`, `#ef4444`, `#FECACA`

**Yellows/Oranges:**
- `#D97706`, `#eab308`, `#f59e0b`, `#fbbf24`, `#FEF3C7`

**Grays:**
- `#0f172a`, `#111827`, `#1e293b`, `#1f2937`, `#334155`, `#374151`, `#475569`, `#4b5563`, `#64748b`, `#6b7280`, `#6B7280`, `#94a3b8`, `#9ca3af`, `#a0aec0`, `#cbd5e0`, `#cbd5e1`, `#d1d5db`, `#e2e8f0`, `#E2E8F0`, `#e5e7eb`, `#f0f0f0`, `#f0f4f8`, `#f1f5f9`, `#f3f4f6`, `#F5F6FA`, `#f8fafc`, `#f9fafb`

**Whites:**
- `#ffffff`, `#FFFFFF`, `white`

---

**End of Design Audit**
**Total Colors Documented: 80+**
**Total Hover Effects: 35+**
**Total Components Analyzed: 15+**
