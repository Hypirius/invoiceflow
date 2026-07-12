"use client";

import { Document, StyleSheet, Page, View } from "@react-pdf/renderer";
import Header from "./Header";
import BusinessDetails from "./BusinessDetails";
import ClientAddresses from "./ClientAddresses";
import InvoiceDetails from "./InvoiceDetails";
import Table from "./Table";
import Totals from "./Totals";

const demoData = {
  address: {
    name: "test inc",
    street: "22, Court house",
    state: "Dhaka",
    zipCode: "1100",
  },
  ClientAddresses: {
    shippingAddress: {
      name: "zimo inc",
      street: "Test House",
      state: "Dhaka",
      zipCode: "1041",
    },
    billingAddress: {
      name: "zimo inc",
      street: "Test House",
      state: "Dhaka",
      zipCode: "1041",
    },
  },
  invoiceDetails: {
    number: 1,
    date: "27/03/26",
    poNumber: "41",
    dueDate: "30/06/26",
  },
  items: [
    {
      qty: 1,
      description: "set of tires wadawdadadadadadadadadadadadad",
      unitPrice: 25,
    },
  ],
};

function InvoicePDFGen() {
  const styles = StyleSheet.create({
    mainContainer: {
      padding: 20,
      fontSize: 12,
    },
    details: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
  });
  return (
    <Document>
      <Page size="A4">
        <View style={styles.mainContainer} id="main-container">
          <Header image="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-design-template-e089327a5c476ce5c70c74f7359c5898_screen.jpg?ts=1672291305" />
          <BusinessDetails {...demoData.address} />
          <View style={styles.details}>
            <ClientAddresses {...demoData.ClientAddresses} />
            <InvoiceDetails {...demoData.invoiceDetails} />
          </View>
          <Table items={demoData.items} />
          <Totals total={25} />
        </View>
      </Page>
    </Document>
  );
}

export default InvoicePDFGen;
