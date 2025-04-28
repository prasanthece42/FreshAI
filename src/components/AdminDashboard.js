// src/components/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

const AdminDashboard = () => {
  const [conversations, setConversations] = useState([]);

  // Fetching customer interactions (conversations) from Supabase
  const fetchConversations = async () => {
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setConversations(data);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <h3>Customer Interactions</h3>
      <table className="conversations-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Query</th>
            <th>Response</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {conversations.map((conversation) => (
            <tr key={conversation.id}>
              <td>{conversation.user_id}</td>
              <td>{conversation.query}</td>
              <td>{conversation.response}</td>
              <td>{new Date(conversation.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
