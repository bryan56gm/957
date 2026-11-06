import { useCallback, useEffect, useMemo, useState } from "react";
import { findItem } from "./data/menu";
import { useCart } from "./hooks/useCart";
import { useDemoClock } from "./hooks/useDemoClock";
import { useI18n } from "./hooks/useI18n";
import { useOrders } from "./hooks/useOrders";
import { usePush } from "./hooks/usePush";
import { useScrollLock } from "./hooks/useScrollLock";
import { useTheme } from "./hooks/useTheme";
import { useToast } from "./hooks/useToast";
import { useWaitlist } from "./hooks/useWaitlist";
import { pickupSlots } from "./lib/clock";
import { AllergenSheet } from "./components/AllergenSheet";
import { BillSheet } from "./components/BillSheet";
import { BottomNav } from "./components/BottomNav";
import { CartBar } from "./components/CartBar";
import { CartSheet } from "./components/CartSheet";
import { HomeScreen } from "./components/HomeScreen";
import { MenuScreen } from "./components/MenuScreen";
import { ModeSheet } from "./components/ModeSheet";
import { OrderScreen } from "./components/OrderScreen";
import { OrdersScreen } from "./components/OrdersScreen";
import { ProductSheet } from "./components/ProductSheet";
import { ProfileScreen } from "./components/ProfileScreen";
import { PushBanner } from "./components/PushBanner";
import { TableScanner } from "./components/TableScanner";
import { Toast } from "./components/Toast";
import { TopBar } from "./components/TopBar";
import { UpsellSheet } from "./components/UpsellSheet";
import { WaitlistSheet } from "./components/WaitlistSheet";
import { WelcomeScreen } from "./components/WelcomeScreen";

const STARTER_CATEGORY = "tapas";
const TITLES = { home: "957", menu: "navMenu", orders: "navOrders", profile: "navProfile" };

export default function App() {
  const { t, name } = useI18n();
  const { theme, setTheme, toggleTheme } = useTheme();
  const { message, notify } = useToast();
  const { push, show: showPush, dismiss: dismissPush } = usePush();
  const now = useDemoClock();
  const cart = useCart();

  const [screen, setScreen] = useState("welcome");
  const [mode, setMode] = useState(null);
  const [menuTag, setMenuTag] = useState({ tag: null, key: 0 });
  const [productItem, setProductItem] = useState(null);
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [upsellShown, setUpsellShown] = useState(false);
  const [cartStep, setCartStep] = useState(null);
  const [scanner, setScanner] = useState(null);
  const [billOpen, setBillOpen] = useState(false);
  const [waitOpen, setWaitOpen] = useState(false);
  const [modeSheetOpen, setModeSheetOpen] = useState(false);
  const [allergenOpen, setAllergenOpen] = useState(false);
  const [allergens, setAllergens] = useState([]);
  const [alertsOn, setAlertsOn] = useState(true);
  const [openOrderId, setOpenOrderId] = useState(null);

  const onOrderUpdate = useCallback((order, status) => {
    if (!alertsOn) return;
    if (status === "ready" && order.mode.type === "takeaway") {
      showPush({ title: t("pushReady"), body: t("pushReadySub", { code: order.code }), action: { type: "order", id: order.id } });
    } else if (status === "served") {
      showPush({ title: t("pushServed", { table: order.mode.table }), body: t("pushServedSub"), action: { type: "order", id: order.id } });
    }
  }, [alertsOn, showPush, t]);

  const orders = useOrders(onOrderUpdate);

  const waitlist = useWaitlist(useCallback((entry) => {
    showPush({ title: t("waitReady"), body: t("waitReadySub", { table: entry.table }), action: { type: "waitlist" } });
  }, [showPush, t]));

  const openOrder = orders.active.find((order) => order.id === openOrderId) || null;
  const overlayOpen = Boolean(productItem || upsellOpen || cartStep || scanner || billOpen || waitOpen || modeSheetOpen || allergenOpen || openOrder);
  useScrollLock(overlayOpen);

  useEffect(() => { window.scrollTo(0, 0); }, [screen]);

  const navigate = useCallback((target) => setScreen(target), []);
  const openMenu = useCallback((tag = null) => {
    setMenuTag((current) => ({ tag: typeof tag === "string" ? tag : null, key: current.key + 1 }));
    setScreen("menu");
  }, []);

  const firstFreeSlot = useMemo(() => pickupSlots(now).find((slot) => !slot.full)?.time, [now]);
  const startTakeaway = useCallback(() => setMode({ type: "takeaway", slot: firstFreeSlot }), [firstFreeSlot]);

  const choose = useCallback((id) => {
    setModeSheetOpen(false);
    if (id === "takeaway") {
      startTakeaway();
      openMenu();
    } else if (id === "table") {
      setScanner({ then: "menu" });
    } else if (id === "waitlist") {
      setScreen("home");
      setWaitOpen(true);
    } else {
      openMenu();
    }
  }, [openMenu, startTakeaway]);

  const addLine = useCallback((line) => {
    const item = findItem(line.itemId);
    cart.addLine(line);
    setProductItem(null);
    notify(t("toastAdded", { name: name(item) }));
    const hasStarter = cart.lines.some((current) => findItem(current.itemId)?.category === STARTER_CATEGORY);
    if (item.category === "pizzas" && !hasStarter && !upsellShown) {
      setUpsellShown(true);
      setTimeout(() => setUpsellOpen(true), 260);
    }
  }, [cart, name, notify, t, upsellShown]);

  const quickAdd = useCallback((item) => {
    cart.addLine({ itemId: item.id });
    notify(t("toastAdded", { name: name(item) }));
  }, [cart, name, notify, t]);

  const confirmTable = useCallback((tableMode) => {
    const next = scanner?.then;
    setMode(tableMode);
    setScanner(null);
    if (next === "cart") setCartStep("cart");
    else if (next === "menu") openMenu();
  }, [scanner, openMenu]);

  const placeOrder = useCallback((orderMode) => {
    const order = orders.placeOrder(cart.lines, orderMode);
    cart.clearCart();
    setCartStep(null);
    setOpenOrderId(order.id);
  }, [cart, orders]);

  const closeCart = useCallback((target) => {
    setCartStep(null);
    if (target === "menu") openMenu();
  }, [openMenu]);

  const reorder = useCallback((order) => {
    cart.addLines(order.lines.map(({ key, ...line }) => line));
    notify(t("toastReorder"));
    setCartStep("cart");
  }, [cart, notify, t]);

  const tapPush = useCallback((item) => {
    dismissPush();
    if (item.action?.type === "order") setOpenOrderId(item.action.id);
    if (item.action?.type === "waitlist") setWaitOpen(true);
  }, [dismissPush]);

  const acceptTable = useCallback(() => {
    const table = waitlist.entry.table;
    dismissPush();
    setMode({ type: "table", table, zone: "inside" });
    waitlist.leave();
    setWaitOpen(false);
    notify(t("toastTable", { table }));
    openMenu();
  }, [waitlist, notify, t, openMenu, dismissPush]);

  const finishBill = useCallback(() => {
    orders.payTable();
    setBillOpen(false);
    setMode(null);
    setScreen("home");
  }, [orders]);

  const onTable = useCallback(() => {
    if (mode?.type === "table") setBillOpen(true);
    else setScanner({ then: "menu" });
  }, [mode]);

  const restart = useCallback(() => {
    cart.clearCart();
    setMode(null);
    waitlist.leave();
    setScreen("welcome");
  }, [cart, waitlist]);

  if (screen === "welcome") {
    return (
      <div className="app">
        <WelcomeScreen now={now} onChoose={choose} onToggleTheme={toggleTheme} />
        <TableScanner open={Boolean(scanner)} onClose={() => setScanner(null)} onConfirm={confirmTable} />
      </div>
    );
  }

  const showCartBar = (screen === "home" || screen === "menu") && cart.count > 0 && !overlayOpen;

  return (
    <div className="app">
      <section className={`screen shell active ${showCartBar ? "with-cart" : ""}`} key={screen}>
        <TopBar title={screen === "home" ? TITLES.home : t(TITLES[screen])} cartCount={cart.count} onOpenCart={() => setCartStep("cart")} onHome={() => navigate("home")} />
        {screen === "home" && (
          <HomeScreen
            now={now} mode={mode} orders={orders.active} waitlist={waitlist}
            onChangeMode={() => setModeSheetOpen(true)} onOpenOrder={(order) => setOpenOrderId(order.id)}
            onOpenWaitlist={() => setWaitOpen(true)} onOpenItem={setProductItem} onOpenMenu={openMenu}
            onGlutenFree={() => { setAllergens((current) => (current.includes("gluten") ? current : [...current, "gluten"])); openMenu(); }}
          />
        )}
        {screen === "menu" && (
          <MenuScreen
            key={menuTag.key} now={now} initialTag={menuTag.tag} allergens={allergens}
            onOpenAllergens={() => setAllergenOpen(true)} onOpenItem={setProductItem} onQuickAdd={quickAdd} hasItem={cart.hasItem}
          />
        )}
        {screen === "orders" && <OrdersScreen active={orders.active} history={orders.history} onOpenOrder={(order) => setOpenOrderId(order.id)} onReorder={reorder} />}
        {screen === "profile" && (
          <ProfileScreen
            theme={theme} onSetTheme={setTheme} allergens={allergens} onOpenAllergens={() => setAllergenOpen(true)}
            alertsOn={alertsOn} onToggleAlerts={() => setAlertsOn((current) => !current)} onRestart={restart}
          />
        )}
      </section>

      {showCartBar && <CartBar count={cart.count} total={cart.subtotal} onOpen={() => setCartStep("cart")} />}
      <BottomNav active={screen} onNavigate={navigate} onTable={onTable} tableNumber={mode?.type === "table" ? mode.table : null} ordersBadge={orders.active.length} />

      <ProductSheet item={productItem} now={now} onClose={() => setProductItem(null)} onAdd={addLine} />
      <UpsellSheet open={upsellOpen} onClose={() => setUpsellOpen(false)} onAdd={quickAdd} hasItem={cart.hasItem} />
      <CartSheet
        open={Boolean(cartStep)} step={cartStep} onStep={setCartStep} onClose={closeCart} cart={cart}
        mode={mode} onModeChange={setMode} onScanTable={() => { setCartStep(null); setScanner({ then: "cart" }); }} now={now} onPlace={placeOrder}
      />
      <ModeSheet open={modeSheetOpen} onClose={() => setModeSheetOpen(false)} onChoose={choose} />
      <AllergenSheet open={allergenOpen} value={allergens} onClose={() => setAllergenOpen(false)} onApply={(next) => { setAllergens(next); setAllergenOpen(false); }} />
      <WaitlistSheet
        open={waitOpen} waitlist={waitlist} onClose={() => setWaitOpen(false)}
        onJoin={(data) => { waitlist.join(data); notify(t("toastWaitJoined")); }}
        onLeave={() => { waitlist.leave(); setWaitOpen(false); notify(t("toastWaitLeft")); }}
        onAccept={acceptTable} onSeeMenu={() => { setWaitOpen(false); openMenu(); }}
      />
      <BillSheet open={billOpen} table={mode?.table} orders={orders.tableOrders} onClose={() => setBillOpen(false)} onPaid={finishBill} />
      <OrderScreen
        order={openOrder} onClose={() => setOpenOrderId(null)}
        onCollect={(id) => { orders.collect(id); setOpenOrderId(null); }}
        onAnotherRound={() => { setOpenOrderId(null); openMenu(); }}
        onSeeBill={() => { setOpenOrderId(null); setBillOpen(true); }}
      />
      <TableScanner open={Boolean(scanner)} onClose={() => setScanner(null)} onConfirm={confirmTable} />
      <PushBanner push={push} onTap={tapPush} onDismiss={dismissPush} />
      <Toast message={message} />
    </div>
  );
}
