import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { useState, useEffect } from "react";
import RequestHistoryComp from "./RequestHistoryComp";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { DataTable } from "react-native-paper";
import { db } from "../../config";
export default function RequestHistory({ route, navigation }) {
  const id = route.params;
  console.log(id);

  const [request, setRequest] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "familyRequests"),
      where("familyID", "==", `${id}`),
      where("status", "==", "fullfied")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("snapshot");
      setRequest(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });

    return () => unsubscribe();
  }, [id]);
  const [cart, setCart] = useState([]);

  console.log(request);

  return (
    <View>
      <Text>Request History</Text>
      {request.length == 0 ? (
        <Text>there are no complete requests yet</Text>
      ) : null}
      {request.map((elem, i) => (
        <Card title="cart">
          <View
            key={i}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={{ marginBottom: 10 }}> {elem.familyID}</Text>
            {/* elem.nameoftheattrbiteinDB.toDate().toDateString() */}
            <Text style={{ marginBottom: 10 }}>Mon Oct 31 2022</Text>
            {/* <Text style={{ marginBottom: 10 }}>Status: {elem.status}</Text> */}
          </View>

          <DataTable>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title textStyle={{ color: "black", fontSize: 15 }}>
                Group
              </DataTable.Title>
              <DataTable.Title textStyle={{ color: "black", fontSize: 15 }}>
                Color
              </DataTable.Title>
              <DataTable.Title textStyle={{ color: "black", fontSize: 15 }}>
                Qty
              </DataTable.Title>
              <DataTable.Title textStyle={{ color: "black", fontSize: 15 }}>
                Size
              </DataTable.Title>
              <DataTable.Title textStyle={{ color: "black", fontSize: 15 }}>
                Type
              </DataTable.Title>
            </DataTable.Header>
            <RequestHistoryComp itemsid={elem.id} />
          </DataTable>
          <Text></Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",

              width: "100%",
            }}
          >
            <Text style={{ marginBottom: 10 }}>Status {elem.status}</Text>
          </View>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: "#842DCE",
  },
});
