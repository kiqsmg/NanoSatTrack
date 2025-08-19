import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  useTheme,
  Alert,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  SmartToy,
  HealthAndSafety,
  ClearAll,
  Send,
  Person,
} from '@mui/icons-material';
import Header from '../../components/Header';

const Chat = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = {
        id: 'welcome',
        message: `🛰️ Welcome to the FloripaSat-1 AI Assistant!

I'm here to help you explore and understand your satellite telemetry data.

Ready to explore your satellite mission data! 🚀`,
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now() + '_user',
      message: inputMessage.trim(),
      isUser: true,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    try {
      // Call the backend AI service
      const response = await fetch('http://localhost:8000/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          user_id: 'web_user'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage = {
          id: Date.now() + '_ai',
          message: data.ai_response,
          isUser: false,
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Handle error response
        const errorData = await response.json();
        const aiMessage = {
          id: Date.now() + '_ai',
          message: `❌ Error: ${errorData.detail || 'Failed to get AI response'}`,
          isUser: false,
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Error calling AI service:', error);
      const aiMessage = {
        id: Date.now() + '_ai',
        message: '❌ Connection error: Unable to reach the AI service. Please check if the backend is running.',
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="🤖 AI Satellite Assistant"
        subtitle="Chat with AI to analyze FloripaSat-1 telemetry data"
      />

      <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
        ✅ AI Chat system connected to backend! Ask me about satellite data, battery performance, or any technical questions.
      </Alert>

      <Box 
        display="flex" 
        flexDirection="column" 
        height="calc(100vh - 250px)"
        sx={{ minHeight: '600px' }}
      >
        <Paper
          elevation={1}
          sx={{
            p: 2,
            mb: 1,
            bgcolor: theme.palette.background.alt,
            borderRadius: '12px 12px 0 0',
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <SmartToy color="primary" sx={{ fontSize: 28 }} />
            <Typography variant="h6" color="primary">
              FloripaSat-1 AI Assistant
            </Typography>
          </Box>
        </Paper>

        <Box
          flex={1}
          sx={{
            overflowY: 'auto',
            px: 2,
            py: 2,
            bgcolor: theme.palette.background.default,
            borderRadius: '0 0 12px 12px',
            border: `1px solid ${theme.palette.divider}`,
            borderTop: 'none',
          }}
        >
          {messages.map((message) => (
            <Box
              key={message.id}
              display="flex"
              flexDirection={message.isUser ? 'row-reverse' : 'row'}
              alignItems="flex-start"
              mb={2}
              gap={1}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: message.isUser 
                    ? theme.palette.primary.main 
                    : theme.palette.secondary.main,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                {message.isUser ? <Person /> : <SmartToy />}
              </Box>

              <Box maxWidth="70%">
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    bgcolor: message.isUser 
                      ? theme.palette.primary.main 
                      : theme.palette.background.paper,
                    color: message.isUser 
                      ? theme.palette.primary.contrastText 
                      : theme.palette.text.primary,
                    borderRadius: message.isUser 
                      ? '20px 20px 5px 20px' 
                      : '20px 20px 20px 5px',
                  }}
                >
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.5,
                    }}
                  >
                    {message.message}
                  </Typography>
                </Paper>
              </Box>
            </Box>
          ))}
          
          {isLoading && (
            <Box
              display="flex"
              flexDirection="row"
              alignItems="flex-start"
              mb={2}
              gap={1}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: theme.palette.secondary.main,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                <SmartToy />
              </Box>
              <Box maxWidth="70%">
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    bgcolor: theme.palette.background.paper,
                    borderRadius: '20px 20px 20px 5px',
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <CircularProgress size={16} />
                    <Typography variant="body2" color="text.secondary">
                      AI is thinking...
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        <Paper
          elevation={2}
          sx={{
            p: 2,
            mt: 2,
            bgcolor: theme.palette.background.paper,
            borderRadius: 2,
          }}
        >
          <Box display="flex" gap={1} alignItems="flex-end">
            <Box 
              component="textarea"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask me about satellite data, battery performance, anomalies..."
              sx={{
                flex: 1,
                minHeight: '60px',
                maxHeight: '120px',
                resize: 'vertical',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '12px',
                padding: '12px',
                fontSize: '14px',
                fontFamily: 'inherit',
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                '&:focus': {
                  outline: `2px solid ${theme.palette.primary.main}`,
                  borderColor: theme.palette.primary.main,
                },
              }}
            />
            
            <IconButton
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              sx={{
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
                '&:disabled': {
                  bgcolor: theme.palette.action.disabledBackground,
                },
              }}
            >
              {isLoading ? <CircularProgress size={20} color="inherit" /> : <Send />}
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Chat;
