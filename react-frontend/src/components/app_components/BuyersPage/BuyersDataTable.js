import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef, useEffect} from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../../services/UploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../../utils/DownloadCSV";
import InboxCreateDialogComponent from "../../cb_components/InboxPage/InboxCreateDialogComponent";
import InviteIcon from "../../../assets/media/Invite.png";
import ExportIcon from "../../../assets/media/Export & Share.png";
import CopyIcon from "../../../assets/media/Clipboard.png";
import DuplicateIcon from "../../../assets/media/Duplicate.png";
import DeleteIcon from "../../../assets/media/Trash.png";

const BuyersDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading, user,   selectedDelete,
  setSelectedDelete, onCreateResult}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState([]);

const dropdownTemplate0 = (rowData, { rowIndex }) => <p >{rowData.buyersName?.name}</p>
const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.buyersTin}</p>
const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.buyersSstRegistrationNumber}</p>
const dropdownTemplate3 = (rowData, { rowIndex }) => <p >{rowData.identifierType?.identifyType}</p>
const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.businessRegistrationNumberIdentificationNumberPassportNumber}</p>
const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.buyersEMail}</p>
const dropdownTemplate6 = (rowData, { rowIndex }) => <p >{rowData.buyersAddressCountryName?.countryCode}</p>
const dropdownTemplate7 = (rowData, { rowIndex }) => <p >{rowData.buyersAddressStateName?.stateCode}</p>
const pTemplate8 = (rowData, { rowIndex }) => <p >{rowData.buyersAddressCityName}</p>
const p_numberTemplate9 = (rowData, { rowIndex }) => <p >{rowData.buyersAddressPostalZone}</p>
const dropdownTemplate10 = (rowData, { rowIndex }) => <p >{rowData.theFirstBuyersContactNumber?.phoneNumberPrefix}</p>
const p_numberTemplate11 = (rowData, { rowIndex }) => <p >{rowData.buyersContactNumber}</p>
const dropdownTemplate12 = (rowData, { rowIndex }) => <p >{rowData.invoiceCurrency?.currencyCode}</p>
const p_numberTemplate13 = (rowData, { rowIndex }) => <p >{rowData.currencyExchangeRate}</p>
const dropdownTemplate14 = (rowData, { rowIndex }) => <p >{rowData.frequencyOfBilling?.frequencyOfBilling}</p>
const p_dateTemplate15 = (rowData, { rowIndex }) => <p >{(new Date(rowData.billingPeriodStartDate)).toLocaleDateString()}</p>
const p_dateTemplate16 = (rowData, { rowIndex }) => <p >{(new Date(rowData.billingPeriodEndDate)).toLocaleDateString()}</p>
const dropdownTemplate17 = (rowData, { rowIndex }) => <p >{rowData.paymentMode?.paymentMode}</p>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
      const checkboxTemplate = (rowData) => (
    <Checkbox
      checked={selectedItems.some((item) => item._id === rowData._id)}
      onChange={(e) => {
        let _selectedItems = [...selectedItems];

        if (e.checked) {
          _selectedItems.push(rowData);
        } else {
          _selectedItems = _selectedItems.filter(
            (item) => item._id !== rowData._id,
          );
        }
        setSelectedItems(_selectedItems);
      }}
    />
  );
  const deselectAllRows = () => {
    // Logic to deselect all selected rows
    setSelectedItems([]); // Assuming setSelectedItems is used to manage selected items state
  };

  const handleDelete = async () => {
    if (!selectedItems || selectedItems.length === 0) return;

    try {
      const promises = selectedItems.map((item) =>
        client.service("companies").remove(item._id),
      );
      await Promise.all(promises);
      const updatedData = data.filter(
        (item) => !selectedItems.find((selected) => selected._id === item._id),
      );
      setData(updatedData);
      setSelectedDelete(selectedItems.map((item) => item._id));

      deselectAllRows();
    } catch (error) {
      console.error("Failed to delete selected records", error);
    }
  };
    
  const handleMessage = () => {
    setShowDialog(true); // Open the dialog
  };

  const handleHideDialog = () => {
    setShowDialog(false); // Close the dialog
  };

    return (
        <>
        <DataTable 
           value={items}
        ref={dt}
        removableSort
        onRowClick={onRowClick}
        scrollable
        rowHover
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 250, 500]}
        size={"small"}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        rowClassName="cursor-pointer"
        alwaysShowPaginator={!urlParams.singleUsersId}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        onCreateResult={onCreateResult}
        >
                <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          body={checkboxTemplate}
        />
<Column field="buyersName" header="Buyer's name (*)" body={dropdownTemplate0} filter={selectedFilterFields.includes("buyersName")} hidden={selectedHideFields?.includes("buyersName")}  style={{ minWidth: "8rem" }} />
<Column field="buyersTin" header="Buyer's TIN" body={pTemplate1} filter={selectedFilterFields.includes("buyersTin")} hidden={selectedHideFields?.includes("buyersTin")}  sortable style={{ minWidth: "8rem" }} />
<Column field="buyersSstRegistrationNumber" header="Buyer's SST Registration Number" body={pTemplate2} filter={selectedFilterFields.includes("buyersSstRegistrationNumber")} hidden={selectedHideFields?.includes("buyersSstRegistrationNumber")}  sortable style={{ minWidth: "8rem" }} />
<Column field="identifierType" header="Identifier Type" body={dropdownTemplate3} filter={selectedFilterFields.includes("identifierType")} hidden={selectedHideFields?.includes("identifierType")}  style={{ minWidth: "8rem" }} />
<Column field="businessRegistrationNumberIdentificationNumberPassportNumber" header="Business registration number / Identification number / Passport number" body={pTemplate4} filter={selectedFilterFields.includes("businessRegistrationNumberIdentificationNumberPassportNumber")} hidden={selectedHideFields?.includes("businessRegistrationNumberIdentificationNumberPassportNumber")}  sortable style={{ minWidth: "8rem" }} />
<Column field="buyersEMail" header="Buyer's e-mail" body={pTemplate5} filter={selectedFilterFields.includes("buyersEMail")} hidden={selectedHideFields?.includes("buyersEMail")}  sortable style={{ minWidth: "8rem" }} />
<Column field="buyersAddressCountryName" header="Buyer's address (Country name)" body={dropdownTemplate6} filter={selectedFilterFields.includes("buyersAddressCountryName")} hidden={selectedHideFields?.includes("buyersAddressCountryName")}  style={{ minWidth: "8rem" }} />
<Column field="buyersAddressStateName" header="Buyer's address (State name)" body={dropdownTemplate7} filter={selectedFilterFields.includes("buyersAddressStateName")} hidden={selectedHideFields?.includes("buyersAddressStateName")}  style={{ minWidth: "8rem" }} />
<Column field="buyersAddressCityName" header="Buyer's address (City name)" body={pTemplate8} filter={selectedFilterFields.includes("buyersAddressCityName")} hidden={selectedHideFields?.includes("buyersAddressCityName")}  sortable style={{ minWidth: "8rem" }} />
<Column field="buyersAddressPostalZone" header="Buyer's address (Postal zone)" body={p_numberTemplate9} filter={selectedFilterFields.includes("buyersAddressPostalZone")} hidden={selectedHideFields?.includes("buyersAddressPostalZone")}  sortable style={{ minWidth: "8rem" }} />
<Column field="theFirstBuyersContactNumber" header="The first buyer's contact number" body={dropdownTemplate10} filter={selectedFilterFields.includes("theFirstBuyersContactNumber")} hidden={selectedHideFields?.includes("theFirstBuyersContactNumber")}  style={{ minWidth: "8rem" }} />
<Column field="buyersContactNumber" header="Buyer's Contact Number" body={p_numberTemplate11} filter={selectedFilterFields.includes("buyersContactNumber")} hidden={selectedHideFields?.includes("buyersContactNumber")}  sortable style={{ minWidth: "8rem" }} />
<Column field="invoiceCurrency" header="Invoice Currency" body={dropdownTemplate12} filter={selectedFilterFields.includes("invoiceCurrency")} hidden={selectedHideFields?.includes("invoiceCurrency")}  style={{ minWidth: "8rem" }} />
<Column field="currencyExchangeRate" header="Currency Exchange Rate" body={p_numberTemplate13} filter={selectedFilterFields.includes("currencyExchangeRate")} hidden={selectedHideFields?.includes("currencyExchangeRate")}  sortable style={{ minWidth: "8rem" }} />
<Column field="frequencyOfBilling" header="Frequency of Billing" body={dropdownTemplate14} filter={selectedFilterFields.includes("frequencyOfBilling")} hidden={selectedHideFields?.includes("frequencyOfBilling")}  style={{ minWidth: "8rem" }} />
<Column field="billingPeriodStartDate" header="Billing Period Start Date" body={p_dateTemplate15} filter={selectedFilterFields.includes("billingPeriodStartDate")} hidden={selectedHideFields?.includes("billingPeriodStartDate")}  sortable style={{ minWidth: "8rem" }} />
<Column field="billingPeriodEndDate" header="Billing Period End Date" body={p_dateTemplate16} filter={selectedFilterFields.includes("billingPeriodEndDate")} hidden={selectedHideFields?.includes("billingPeriodEndDate")}  sortable style={{ minWidth: "8rem" }} />
<Column field="paymentMode" header="Payment Mode" body={dropdownTemplate17} filter={selectedFilterFields.includes("paymentMode")} hidden={selectedHideFields?.includes("paymentMode")}  style={{ minWidth: "8rem" }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            
        </DataTable>


      {selectedItems.length > 0 ? (
        <div
          className="card center"
          style={{
            width: "51rem",
            margin: "20px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            color: "#2A4454",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #2A4454",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {selectedItems.length} selected
            <span
              className="pi pi-times"
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                color: "#2A4454",
              }}
              onClick={() => {
                deselectAllRows();
              }}
            />
          </div>

          {/* New buttons section */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Copy button */}
            <Button
              label="Copy"
              labelposition="right"
              icon={
                <img
                  src={CopyIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Copy"
              // onClick={handleCopy}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Duplicate button */}
            <Button
              label="Duplicate"
              labelposition="right"
              icon={
                <img
                  src={DuplicateIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Duplicate"
              // onClick={handleDuplicate}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Export button */}
            <Button
              label="Export"
              labelposition="right"
              icon={
                <img
                  src={ExportIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Export"
              // onClick={handleExport}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Message button */}
            <Button
              label="Message"
              labelposition="right"
              icon={
                <img
                  src={InviteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleMessage}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* InboxCreateDialogComponent */}
            <InboxCreateDialogComponent
              show={showDialog}
              onHide={handleHideDialog}
              serviceInbox="companies"
              onCreateResult={onCreateResult}
              // selectedItemsId={selectedItems.map(item => item._id)}
              selectedItemsId={selectedItems}
            />

            {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            <Button
              label="Delete"
              labelposition="right"
              icon={
                <img
                  src={DeleteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleDelete}
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                gap: "4px",
              }}
            />
          </div>
        </div>
      ) : null}


        <Dialog header="Upload Buyers Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="buyers"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search Buyers" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
    <Dialog
        header="Filter Users"
        visible={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFilterFields}
            onChange={(e) => setSelectedFilterFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedFilterFields);
            onClickSaveFilteredfields(selectedFilterFields);
            setSelectedFilterFields(selectedFilterFields);
            setShowFilter(false)
          }}
        ></Button>
      </Dialog>

      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default BuyersDataTable;