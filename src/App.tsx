import { useMemo, useState } from 'react'
import './App.css'

type Category = 'Sushi' | 'Roll / Maki' | 'Other' | 'Drinks'
type MenuItem = { id: number; category: Category; thai: string; english: string; price: number; image: string }

const categoryImages: Record<Category, string> = {
  Sushi: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=85',
  'Roll / Maki': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=85',
  Other: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=85',
  Drinks: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=85',
}

const source: Array<[number, Category, string, string, number]> = [
  [1, 'Sushi', 'แซลมอนซูชิ', 'Salmon Sushi', 45], [2, 'Sushi', 'แซลมอนเบิร์น', 'Aburi Salmon Sushi', 50],
  [3, 'Sushi', 'ทูน่าซูชิ', 'Tuna Sushi', 45], [4, 'Sushi', 'อากามิซูชิ', 'Akami Sushi', 50],
  [5, 'Sushi', 'กุ้งซูชิ', 'Shrimp Sushi', 35], [6, 'Sushi', 'ปลาหมึกซูชิ', 'Squid Sushi', 35],
  [7, 'Sushi', 'ไข่หวานซูชิ', 'Tamago Sushi', 30], [8, 'Sushi', 'ปูอัดซูชิ', 'Crab Stick Sushi', 30],
  [9, 'Sushi', 'ปลาไหลซูชิ', 'Unagi Sushi', 60], [10, 'Sushi', 'หอยเชลล์ซูชิ', 'Scallop Sushi', 65],
  [11, 'Roll / Maki', 'แคลิฟอร์เนียโรล', 'California Roll', 120], [12, 'Roll / Maki', 'แซลมอนโรล', 'Salmon Roll', 140],
  [13, 'Roll / Maki', 'สไปซี่ทูน่าโรล', 'Spicy Tuna Roll', 150], [14, 'Roll / Maki', 'เอบิโรล', 'Ebi Roll', 130],
  [15, 'Roll / Maki', 'อะโวคาโดโรล', 'Avocado Roll', 110], [16, 'Other', 'อุด้ง', 'Udon', 100],
  [17, 'Other', 'ราเมนโชยุ', 'Shoyu Ramen', 120], [18, 'Other', 'เกี๊ยวซ่า', 'Gyoza', 80],
  [19, 'Other', 'เอดามาเมะ', 'Edamame', 60], [20, 'Other', 'ไก่คาราอาเกะ', 'Chicken Karaage', 90],
  [21, 'Drinks', 'น้ำเปล่า', 'Water', 20], [22, 'Drinks', 'ชาเขียว', 'Green Tea', 35],
  [23, 'Drinks', 'ชาเขียวเย็น', 'Iced Green Tea', 40], [24, 'Drinks', 'โค้ก', 'Coke', 35],
  [25, 'Drinks', 'น้ำส้ม', 'Orange Juice', 45],
]
const menu: MenuItem[] = source.map(([id, category, thai, english, price]) => ({ id, category, thai, english, price, image: categoryImages[category] }))
const categories: Category[] = ['Sushi', 'Roll / Maki', 'Other', 'Drinks']
const baht = (amount: number) => `${amount.toLocaleString('th-TH')} บาท`

function CartIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l1.7 9.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.5L20 7H6.2M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" /></svg> }

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('Sushi')
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const visibleItems = menu.filter((item) => item.category === activeCategory)
  const selectedItems = useMemo(() => menu.filter((item) => quantities[item.id]), [quantities])
  const itemCount = selectedItems.reduce((sum, item) => sum + quantities[item.id], 0)
  const total = selectedItems.reduce((sum, item) => sum + item.price * quantities[item.id], 0)
  const updateQuantity = (id: number, change: number) => setQuantities((current) => ({ ...current, [id]: Math.max(0, (current[id] ?? 0) + change) }))
  const openCart = () => { setConfirmed(false); setCartOpen(true) }

  return <div className="page-shell"><main className="phone" aria-label="SUSHI MIZU ordering menu">
    <header className="header"><div><p className="brand">SUSHI MIZU</p><p className="subtitle">Japanese Sushi Restaurant</p></div>
      <button className="cart-icon" onClick={openCart} aria-label={`ตะกร้า ${itemCount} รายการ`}><CartIcon />{itemCount > 0 && <span>{itemCount}</span>}</button>
    </header>
    <nav className="tabs" aria-label="หมวดหมู่อาหาร">{categories.map((category) => <button key={category} className={activeCategory === category ? 'tab active' : 'tab'} onClick={() => setActiveCategory(category)}>{category}</button>)}</nav>
    <section className="menu-section" aria-live="polite"><div className="section-heading"><h1>{activeCategory}</h1><span>{visibleItems.length} รายการ</span></div><div className="menu-list">
      {visibleItems.map((item) => { const quantity = quantities[item.id] ?? 0; return <article className="food-card" key={item.id}>
        <img src={item.image} alt={item.english} /><div className="food-details"><h2>{item.thai}</h2><p>{item.english}</p><strong>{baht(item.price)}</strong></div>
        <div className="stepper" aria-label={`จำนวน ${item.thai}`}><button disabled={!quantity} onClick={() => updateQuantity(item.id, -1)} aria-label={`ลด ${item.thai}`}>−</button><output>{quantity}</output><button onClick={() => updateQuantity(item.id, 1)} aria-label={`เพิ่ม ${item.thai}`}>+</button></div>
      </article> })}
    </div></section>
    <button className="sticky-cart" onClick={openCart}><CartIcon /><span>Order {itemCount ? `· ${itemCount} items` : ''}</span><b>{baht(total)}</b></button>
    {cartOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setCartOpen(false)}><section className="order-sheet" role="dialog" aria-modal="true" aria-labelledby="order-title" onMouseDown={(event) => event.stopPropagation()}><div className="sheet-handle" />
      {confirmed ? <div className="confirmed"><div className="check">✓</div><h2>Order Confirmed</h2><p>ขอบคุณสำหรับการสั่งอาหาร<br />พนักงานจะนำอาหารมาเสิร์ฟที่โต๊ะของคุณ</p><button className="secondary-button" onClick={() => setCartOpen(false)}>กลับสู่เมนู</button></div> : <>
        <div className="sheet-heading"><h2 id="order-title">Your Order</h2><button className="close" onClick={() => setCartOpen(false)} aria-label="ปิด">×</button></div>
        {selectedItems.length ? <div className="order-items">{selectedItems.map((item) => <div className="order-item" key={item.id}><div><strong>{item.thai}</strong><small>{item.english} × {quantities[item.id]}</small></div><span>{baht(item.price * quantities[item.id])}</span></div>)}</div> : <p className="empty">ยังไม่ได้เลือกเมนู</p>}
        <div className="total"><span>Total</span><strong>{baht(total)}</strong></div><button className="confirm-button" disabled={!selectedItems.length} onClick={() => setConfirmed(true)}>Confirm Order</button>
      </>}
    </section></div>}
  </main></div>
}
export default App
