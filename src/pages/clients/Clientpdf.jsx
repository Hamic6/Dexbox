import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 20 },
  name: { fontSize: 18, fontWeight: 'bold' },
  section: { marginBottom: 10 },
  label: { fontWeight: 'bold' },
  value: { marginLeft: 5 },
});

export function ClientPdfDocument({ client }) {
  if (!client) return null;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {client.avatar && <Image src={client.avatar} style={styles.avatar} />}
          <Text style={styles.name}>{client.name}</Text>
        </View>
        <View style={styles.section}>
          <Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{client.email}</Text>
          </Text>
          <Text>
            <Text style={styles.label}>Téléphone:</Text>
            <Text style={styles.value}>{client.phone}</Text>
          </Text>
          {/* Ajoute ici les autres infos du client */}
        </View>
      </Page>
    </Document>
  );
}

export default function Clientpdf({ client }) {
  return (
    <PDFDownloadLink
      document={<ClientPdfDocument client={client} />}
      fileName={`profil_${client.name}.pdf`}
      style={{ textDecoration: 'none' }}
    >
      {({ loading }) =>
        loading ? 'Préparation du PDF...' : 'Télécharger le profil PDF'
      }
    </PDFDownloadLink>
  );
}