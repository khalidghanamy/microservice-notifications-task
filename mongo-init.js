// MongoDB initialization script
db = db.getSiblingDB('notification-service');

// Create collections
db.createCollection('notifications');

// Create indexes for better performance
db.notifications.createIndex({ "userId": 1 });
db.notifications.createIndex({ "recipient": 1 });
db.notifications.createIndex({ "status": 1 });
db.notifications.createIndex({ "type": 1 });
db.notifications.createIndex({ "createdAt": -1 });
db.notifications.createIndex({ "userId": 1, "createdAt": -1 });

// Insert sample data (optional)
db.notifications.insertMany([
  {
    type: "welcome_email",
    recipient: "sample@example.com",
    subject: "Welcome!",
    message: "Welcome to our platform!",
    userId: "sample-user-id",
    status: "sent",
    metadata: {
      username: "sampleuser",
      registeredAt: new Date()
    },
    sentAt: new Date(),
    retryCount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('Database initialized successfully!');
