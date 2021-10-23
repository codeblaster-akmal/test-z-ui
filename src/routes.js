import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "./components/loader";
// Layout Blueprints
import { LeftSidebar, PresentationLayout } from "./template/layout-blueprints";

// Example Pages
const Category = lazy(() => import("./pages/category"));
const Brand = lazy(() => import("./pages/brand"));
const Group = lazy(() => import("./pages/group"));
const SubGroup = lazy(() => import("./pages/subgroup"));
const Variants = lazy(() => import("./pages/variants"));
const Attributes = lazy(() => import("./pages/attributes"));
const Product = lazy(() => import("./pages/product"));
const AddPromotion = lazy(() => import("./pages/Promotion/addPromotion"));
const PromotionList = lazy(() => import("./pages/Promotion/promotionList"));
const Invitation = lazy(() => import("./pages/invitation"));
const Login = lazy(() => import("./pages/login/login"));
const ProductList = lazy(() => import("./pages/product/productList"));
const Warehouse = lazy(() => import("./pages/warehouse"));
const PriceList = lazy(() => import("./pages/priceList"));
const SectionList = lazy(() => import("./pages/section"));
const TrendingProduct = lazy(() =>
  import("./pages/trendingProduct/trendingProduct")
);
const TrendingProductList = lazy(() =>
  import("./pages/trendingProduct/trendingProductList")
);
const EventList = lazy(() => import("./pages/eventList"));
const AlertList = lazy(() => import("./pages/alertList"));
const EmailList = lazy(() => import("./pages/emailList"));
const CreateEvent = lazy(() => import("./pages/createEvent"));
const CreateAlert = lazy(() => import("./pages/createAlert"));
const CreateEmail = lazy(() => import("./pages/createEmail"));
const OrderListing = lazy(() => import("./pages/orderlisting"));
const OrderCancel = lazy(() => import("./pages/ordercancel"));
const OrderReturn = lazy(() => import("./pages/orderreturn"));
const OrderRefund = lazy(() => import("./pages/orderrefund"));
const CustomerList = lazy(() => import("./pages/customer/customerList"));
const CustomerView = lazy(() => import("./pages/customer/customerView"));

const Routes = () => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 1.01,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  };

  return (
    <AnimatePresence>
      <Suspense
        fallback={
          <div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
            <div className="w-50 mx-auto">
              <Loader />
            </div>
          </div>
        }
      >
        <Switch>
          <Redirect exact from="/" to="/category" />
          <Route path={["/Login"]}>
            <PresentationLayout>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Route path="/Login" component={Login} />
                </motion.div>
              </Switch>
            </PresentationLayout>
          </Route>

          <Route
            path={[
              "/category",
              "/brand",
              "/group",
              "/subgroup",
              "/variants",
              "/attribute",
              "/product",
              "/promoAdd",
              "/promotion",
              "/invitation",
              "/productList",
              "/warehouse",
              "/priceList",
              "/section",
              "/trendingProduct",
              "/trendingProductList",
              "/trendingProduct/edit/:id",
              "/trendingProduct/view/:id",
              "/eventList",
              "/alertList",
              "/emailList",
              "/createEvent",
              "/createAlert",
              "/createEmail",
              "/orderListing",
              "/orderCancel",
              "/orderReturn",
              "/orderRefund",
              "/customerList",
              "/customerView/:id",
            ]}
          >
            <LeftSidebar>
              <Switch location={location} key={location.pathname}>
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Route exact path="/brand" component={Brand} />
                  <Route exact path="/group" component={Group} />
                  <Route exact path="/product" component={Product} />
                  <Route exact path="/category" component={Category} />
                  <Route exact path="/subgroup" component={SubGroup} />
                  <Route exact path="/Variants" component={Variants} />
                  <Route exact path="/warehouse" component={Warehouse} />
                  <Route exact path="/attribute" component={Attributes} />
                  <Route exact path="/invitation" component={Invitation} />
                  <Route exact path="/promotion" component={PromotionList} />
                  <Route exact path="/promoAdd" component={AddPromotion} />
                  <Route exact path="/priceList" component={PriceList} />
                  <Route exact path="/productList" component={ProductList} />
                  <Route exact path="/section" component={SectionList} />
                  <Route
                    exact
                    path="/trendingProduct"
                    component={TrendingProduct}
                  />
                  <Route
                    exact
                    path="/trendingProductList"
                    component={TrendingProductList}
                  />
                  <Route
                    exact
                    path="/trendingProduct/edit/:id"
                    component={TrendingProduct}
                  />
                  <Route
                    exact
                    path="/trendingProduct/view/:id"
                    component={TrendingProduct}
                  />
                  <Route exact path="/eventList" component={EventList} />
                  <Route exact path="/alertList" component={AlertList} />
                  <Route exact path="/emailList" component={EmailList} />
                  <Route exact path="/createEvent" component={CreateEvent} />
                  <Route exact path="/createAlert" component={CreateAlert} />
                  <Route exact path="/createEmail" component={CreateEmail} />
                  <Route exact path="/orderListing" component={OrderListing} />
                  <Route exact path="/orderCancel" component={OrderCancel} />
                  <Route exact path="/orderReturn" component={OrderReturn} />
                  <Route exact path="/orderRefund" component={OrderRefund} />
                  <Route exact path="/customerList" component={CustomerList} />
                  <Route
                    exact
                    path="/customerView/:id"
                    component={CustomerView}
                  />
                </motion.div>
              </Switch>
            </LeftSidebar>
          </Route>
        </Switch>
      </Suspense>
    </AnimatePresence>
  );
};

export default Routes;
