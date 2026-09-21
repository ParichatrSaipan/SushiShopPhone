import { useMemo, useState } from 'react'
import './App.css'
import {
  mainCategories,
  nigiriGroups,
  type MainCategoryId,
  type MenuItem,
} from './menuData'

const usd = (amount: number) => `$${amount.toFixed(2)}`

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4h2l1.7 9.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.5L20 7H6.2M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    </svg>
  )
}

function App() {
  const [activeMain, setActiveMain] = useState<MainCategoryId>('nigiri')
  const [activeGroup, setActiveGroup] = useState(nigiriGroups[0].id)
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const currentGroup =
    nigiriGroups.find((group) => group.id === activeGroup) ?? nigiriGroups[0]

  const allItems = useMemo(
    () =>
      nigiriGroups.flatMap((group) =>
        group.items.map((item) => ({ ...item, image: group.image })),
      ),
    [],
  )

  const selectedItems = allItems.filter((item) => quantities[item.id] > 0)
  const itemCount = selectedItems.reduce(
    (sum, item) => sum + quantities[item.id],
    0,
  )
  const total = selectedItems.reduce(
    (sum, item) => sum + item.price * quantities[item.id],
    0,
  )

  const updateQuantity = (id: string, change: number) => {
    setQuantities((current) => ({
      ...current,
      [id]: Math.max(0, (current[id] ?? 0) + change),
    }))
  }

  const changeMainCategory = (id: MainCategoryId) => {
    setActiveMain(id)
    if (id === 'nigiri') setActiveGroup(nigiriGroups[0].id)
  }

  const openCart = () => {
    setConfirmed(false)
    setCartOpen(true)
  }

  const renderFoodCard = (item: MenuItem) => {
    const quantity = quantities[item.id] ?? 0

    return (
      <article className="food-card" key={item.id}>
        <img src={currentGroup.image} alt={item.english} />

        <div className="food-details">
          <h2>{item.thai}</h2>
          <p>{item.english}</p>
          <strong>{usd(item.price)}</strong>
        </div>

        <div className="stepper" aria-label={`จำนวน ${item.thai}`}>
          <button
            disabled={!quantity}
            onClick={() => updateQuantity(item.id, -1)}
            aria-label={`ลด ${item.thai}`}
          >
            −
          </button>
          <output>{quantity}</output>
          <button
            onClick={() => updateQuantity(item.id, 1)}
            aria-label={`เพิ่ม ${item.thai}`}
          >
            +
          </button>
        </div>
      </article>
    )
  }

  return (
    <div className="page-shell">
      <main className="phone" aria-label="SUSHI MIZU ordering menu">
        <header className="header">
          <div>
            <p className="brand">SUSHI MIZU</p>
            <p className="subtitle">Japanese Sushi Restaurant</p>
          </div>
          <button
            className="cart-icon"
            onClick={openCart}
            aria-label={`ตะกร้า ${itemCount} รายการ`}
          >
            <CartIcon />
            {itemCount > 0 && <span>{itemCount}</span>}
          </button>
        </header>

        <nav className="main-tabs" aria-label="หมวดเมนูหลัก">
          {mainCategories.map((category) => (
            <button
              key={category.id}
              className={activeMain === category.id ? 'main-tab active' : 'main-tab'}
              onClick={() => changeMainCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </nav>

        {activeMain === 'nigiri' ? (
          <>
            <nav className="sub-tabs" aria-label="หมวดย่อยนิกิริ">
              {nigiriGroups.map((group) => (
                <button
                  key={group.id}
                  className={activeGroup === group.id ? 'sub-tab active' : 'sub-tab'}
                  onClick={() => setActiveGroup(group.id)}
                >
                  {group.shortLabel}
                </button>
              ))}
            </nav>

            <section className="menu-section" aria-live="polite">
              <div className="section-heading">
                <div>
                  <span className="category-kicker">นิกิริ</span>
                  <h1>{currentGroup.label}</h1>
                  <p>{currentGroup.english}</p>
                </div>
                <span className="item-total">{currentGroup.items.length} รายการ</span>
              </div>

              <div className="menu-list">
                {currentGroup.items.map(renderFoodCard)}
              </div>
            </section>
          </>
        ) : (
          <section className="empty-category">
            <span>準備中</span>
            <h1>
              {mainCategories.find((category) => category.id === activeMain)?.label}
            </h1>
            <p>รายการเมนูในหมวดนี้กำลังจัดเตรียม</p>
            <button onClick={() => changeMainCategory('nigiri')}>ดูเมนูนิกิริ</button>
          </section>
        )}

        <button className="sticky-cart" onClick={openCart}>
          <CartIcon />
          <span>Order {itemCount ? `· ${itemCount} items` : ''}</span>
          <b>{usd(total)}</b>
        </button>

        {cartOpen && (
          <div
            className="modal-backdrop"
            role="presentation"
            onMouseDown={() => setCartOpen(false)}
          >
            <section
              className="order-sheet"
              role="dialog"
              aria-modal="true"
              aria-labelledby="order-title"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="sheet-handle" />

              {confirmed ? (
                <div className="confirmed">
                  <div className="check">✓</div>
                  <h2>Order Confirmed</h2>
                  <p>
                    ขอบคุณสำหรับการสั่งอาหาร
                    <br />
                    พนักงานจะนำอาหารมาเสิร์ฟที่โต๊ะของคุณ
                  </p>
                  <button
                    className="secondary-button"
                    onClick={() => setCartOpen(false)}
                  >
                    กลับสู่เมนู
                  </button>
                </div>
              ) : (
                <>
                  <div className="sheet-heading">
                    <h2 id="order-title">Your Order</h2>
                    <button
                      className="close"
                      onClick={() => setCartOpen(false)}
                      aria-label="ปิด"
                    >
                      ×
                    </button>
                  </div>

                  {selectedItems.length ? (
                    <div className="order-items">
                      {selectedItems.map((item) => (
                        <div className="order-item" key={item.id}>
                          <div>
                            <strong>{item.thai}</strong>
                            <small>
                              {item.english} × {quantities[item.id]}
                            </small>
                          </div>
                          <span>
                            {usd(item.price * quantities[item.id])}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="empty">ยังไม่ได้เลือกเมนู</p>
                  )}

                  <div className="total">
                    <span>Total</span>
                    <strong>{usd(total)}</strong>
                  </div>
                  <button
                    className="confirm-button"
                    disabled={!selectedItems.length}
                    onClick={() => setConfirmed(true)}
                  >
                    Confirm Order
                  </button>
                </>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
