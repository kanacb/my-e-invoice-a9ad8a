import AppSideBar from "./appSideBar/AppSideBar.js";

/*

import ProductsPage from "../ProductsPage/ProductsPage";
import InvoicesPage from "../InvoicesPage/InvoicesPage";
import SuppliersPage from "../SuppliersPage/SuppliersPage";
import BuyersPage from "../BuyersPage/BuyersPage";
import ShippingPage from "../ShippingPage/ShippingPage";
import MeasurementsPage from "../MeasurementsPage/MeasurementsPage";
import IdentifyTypePage from "../IdentifyTypePage/IdentifyTypePage";
import EInvoiceTypesPage from "../EInvoiceTypesPage/EInvoiceTypesPage";
import ClassificationCodesPage from "../ClassificationCodesPage/ClassificationCodesPage";
import PaymentModesPage from "../PaymentModesPage/PaymentModesPage";
import FrequencyOfBillingPage from "../FrequencyOfBillingPage/FrequencyOfBillingPage";
import CurrencyCodesPage from "../CurrencyCodesPage/CurrencyCodesPage";
import PhoneNumberPrefixPage from "../PhoneNumberPrefixPage/PhoneNumberPrefixPage";
import StateCodesPage from "../StateCodesPage/StateCodesPage";
import CountryCodesPage from "../CountryCodesPage/CountryCodesPage";
import TaxTypesPage from "../TaxTypesPage/TaxTypesPage";
import TeamPage from "../TeamPage/TeamPage";
~cb-add-import~

~cb-add-services-card~

case "products":
                return <ProductsPage />;
case "invoices":
                return <InvoicesPage />;
case "suppliers":
                return <SuppliersPage />;
case "buyers":
                return <BuyersPage />;
case "shipping":
                return <ShippingPage />;
case "measurements":
                return <MeasurementsPage />;
case "identifyType":
                return <IdentifyTypePage />;
case "eInvoiceTypes":
                return <EInvoiceTypesPage />;
case "classificationCodes":
                return <ClassificationCodesPage />;
case "paymentModes":
                return <PaymentModesPage />;
case "frequencyOfBilling":
                return <FrequencyOfBillingPage />;
case "currencyCodes":
                return <CurrencyCodesPage />;
case "phoneNumberPrefix":
                return <PhoneNumberPrefixPage />;
case "stateCodes":
                return <StateCodesPage />;
case "countryCodes":
                return <CountryCodesPage />;
case "taxTypes":
                return <TaxTypesPage />;
case "team":
                return <TeamPage />;
~cb-add-thurthy~

*/

const AppLayout = (props) => {
  const { children, activeKey, activeDropdown } = props;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] mt-20 bg-white">
      <AppSideBar activeKey={activeKey} activeDropdown={activeDropdown} />
      <div className="flex-1 ml-2">{children}</div>
    </div>
  );
};

export default AppLayout;
