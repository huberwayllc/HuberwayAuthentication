import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "Hi!",
  "Welcome to Huberway",
  "We're setting up your environment...",
  "Boost your productivity with our CRM",
  "Automate your marketing like never before",
  "Manage your customers efficiently",
  "Ready to take your business to the next level?"
];

const Step13 = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    if (currentMessage < messages.length) {
      const timer = setTimeout(() => {
        setCurrentMessage(currentMessage + 1);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        window.location.href = 'https://app.huberway.com/account/dashboard';
      }, 4000);
    }
  }, [currentMessage]);

  return (
    <div style={{
      backgroundColor: '#001f3f',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: '30px',
      textAlign: 'center',
      flexDirection: 'column'
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={messages[currentMessage]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
          style={{ maxWidth: '600px' }}
        >
          {messages[currentMessage]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Step13;
