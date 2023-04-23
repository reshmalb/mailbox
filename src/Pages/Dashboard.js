import React from 'react';
import './Dashboard.css'

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Folders</h2>
      <ul>
        <li className="active">Inbox (10)</li>
        <li>Sent</li>
        <li>Drafts</li>
        <li>Spam</li>
        <li>Trash</li>
      </ul>
      <a href="#" className="compose-btn">Compose Email</a>
    </div>
  );
}

function Message(props) {
  return (
    <div className="message">
      <h3>{props.title}</h3>
      <p>{props.sender} - {props.date}</p>
      <p>{props.body}</p>
      <a href="#">Read more</a>
    </div>
  );
}

function MainContent() {
  const messages = [
    {
      id: 1,
      title: 'Meeting Reminder',
      sender: 'John Doe',
      date: 'April 20, 2023',
      body: 'Just a friendly reminder that we have a meeting scheduled for tomorrow at 10am. See you then!',
    },
    {
      id: 2,
      title: 'New Product Launch',
      sender: 'Jane Smith',
      date: 'April 19, 2023',
      body: 'We are excited to announce the launch of our new product! Check it out on our website and let us know what you think.',
    },
    {
      id: 3,
      title: 'Important Update',
      sender: 'Alex Johnson',
      date: 'April 18, 2023',
      body: 'Please be aware that we have made some changes to our policy regarding refunds. Read more on our website.',
    },
  ];

  return (
    <div className="main-content">
      <h2>Inbox</h2>
      {messages.map(message => (
        <Message
          key={message.id}
          title={message.title}
          sender={message.sender}
          date={message.date}
          body={message.body}
        />
      ))}
    </div>
  );
}

function Dashboard() {
  return (
  <div className="container">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default Dashboard;
