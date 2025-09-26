import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Menu, Plus, Mic, Send, FileText, Download, Upload, Settings as SettingsIcon, MicOff, Play, ChevronDown, ChevronUp } from 'lucide-react';
import { ConversationState, UserProfile } from '../App';
import { LoadingStates } from './LoadingStates';
import { ServiceSelection } from './ServiceSelection';
import { JobResults } from './JobResults';
import { HousingResults } from './HousingResults';
import { HousingApplications } from './HousingApplications';
import { Settings } from './Settings';

interface Message {
  id: string;
  type: 'bot' | 'user' | 'audio';
  content: string;
  timestamp: Date;
  audioUrl?: string;
  transcription?: string;
}

interface ChatInterfaceProps {
  language: string;
  userProfile: UserProfile;
  onProfileUpdate: (updates: Partial<UserProfile>) => void;
  conversationState: ConversationState;
  onConversationStateChange: (state: ConversationState) => void;
  onMenuOpen: () => void;
  onLanguageChange: (language: string) => void;
  audioOption: string;
  onAudioOptionChange: (option: string) => void;
  onDeleteAccount: () => void;
  onSignOut: () => void;
}

export function ChatInterface({ 
  language, 
  userProfile, 
  onProfileUpdate, 
  conversationState, 
  onConversationStateChange,
  onMenuOpen,
  onLanguageChange,
  audioOption,
  onAudioOptionChange,
  onDeleteAccount,
  onSignOut
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello I'm Navi, your AI assistant to help navigate your life in USA. Tell me about your self. What is your name?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentService, setCurrentService] = useState<'job' | 'housing' | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [allTextData, setAllTextData] = useState<string>('');
  const [showHousingApplications, setShowHousingApplications] = useState(false);
  const [expandedAudio, setExpandedAudio] = useState<string | null>(null);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Cleanup recording on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
    };
  }, [mediaRecorder]);

  // Cleanup speech synthesis and timeouts on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window && speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  // Text-to-Speech functionality
  const speakText = async (text: string) => {
    try {
      if (audioOption === 'local') {
        // Try to use local audio files
        try {
          const audioFileName = `${text.substring(0, 50).replace(/[^a-zA-Z0-9\s]/g, '').trim()}.wav`;
          const audio = new Audio(`/audio/${audioFileName}`);
          await audio.play();
          return;
        } catch (error) {
          console.log('Local audio file not found, falling back to browser TTS');
        }
      }
      
      // Browser default TTS
      if ('speechSynthesis' in window && text.trim()) {
        // Cancel any existing speech if speaking
        if (isSpeaking || speechSynthesis.speaking) {
          speechSynthesis.cancel();
          setIsSpeaking(false);
          // Small delay to ensure cancellation is processed
          await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        // Handle events
        utterance.onstart = () => {
          setIsSpeaking(true);
        };
        
        utterance.onend = () => {
          setIsSpeaking(false);
        };
        
        utterance.onerror = (event) => {
          setIsSpeaking(false);
          // Only log errors that aren't expected cancellations
          if (event.error !== 'canceled' && event.error !== 'interrupted') {
            console.error('Speech synthesis error:', event.error);
          }
        };
        
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Text-to-speech error:', error);
      setIsSpeaking(false);
    }
  };

  const addMessage = (content: string, type: 'bot' | 'user' | 'audio', audioUrl?: string) => {
    const newMessage: Message = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      content,
      timestamp: new Date(),
      audioUrl
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Update all text data
    setAllTextData(prev => prev + '\n' + content);
    
    // Speak bot messages automatically with a slight delay
    if (type === 'bot') {
      setTimeout(() => speakText(content), 800);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !uploadedFile) return;

    if (uploadedFile) {
      // Handle file upload
      const fileContent = "Sample file content: " + (uploadedFile.name.includes('resume') ? 
        "Krishna Kalakonda, Data Scientist with 5 years experience in Python, Machine Learning" :
        "Document contains personal information and preferences");
      
      addMessage(`Uploaded: ${uploadedFile.name}`, 'user');
      setAllTextData(prev => prev + '\nFile: ' + uploadedFile.name + ' Content: ' + fileContent);
      setUploadedFile(null);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      addMessage("I've processed your uploaded document. Let me continue with the questions.", 'bot');
      return;
    }

    const userMessage = inputValue.trim();
    addMessage(userMessage, 'user');
    setInputValue('');

    await new Promise(resolve => setTimeout(resolve, 1000));
    handleConversationFlow(userMessage);
  };

  const handleConversationFlow = (userMessage: string) => {
    if (conversationState === 'initial') {
      const firstName = userMessage.trim().split(' ')[0];
      onProfileUpdate({ name: firstName });
      addMessage("Hello Krishna, nice to meet you. Where are you from?", 'bot');
      onConversationStateChange('personal-info');
    } else if (conversationState === 'personal-info') {
      if (!userProfile.country) {
        onProfileUpdate({ country: userMessage });
        addMessage('When did you come to USA and what\'s your current visa status?', 'bot');
      } else if (!userProfile.visaStatus) {
        const parts = userMessage.split('.');
        onProfileUpdate({ 
          arrivalDate: parts[0]?.trim(),
          visaStatus: parts[1]?.trim() || userMessage
        });
        addMessage('That\'s good to hear. May I know which of these services are you looking for today?', 'bot');
        onConversationStateChange('service-selection');
      }
    } else if (conversationState === 'job-search') {
      handleJobSearch(userMessage);
    } else if (conversationState === 'housing-search') {
      handleHousingSearch(userMessage);
    }
  };

  const handleServiceSelect = (service: string) => {
    addMessage(service, 'user');
    
    if (service === 'Job Search') {
      setCurrentService('job');
      addMessage('What kind of job are you looking for?', 'bot');
      onConversationStateChange('job-search');
    } else if (service === 'Housing Search') {
      setCurrentService('housing');
      addMessage('Let us find the best house for you together. May I know about the household members?', 'bot');
      onConversationStateChange('housing-search');
    }
  };

  const handleJobSearch = async (userMessage: string) => {
    if (!userProfile.jobType) {
      onProfileUpdate({ jobType: userMessage });
      addMessage('Do you have any relevant skills or experience?', 'bot');
    } else if (!userProfile.skills) {
      onProfileUpdate({ skills: userMessage });
      addMessage('Which city or area would you prefer to work in?', 'bot');
    } else if (!userProfile.preferredLocation) {
      onProfileUpdate({ preferredLocation: userMessage });
      addMessage('Do you have any expectations from job like salary, transport or any benefits?', 'bot');
    } else if (!userProfile.salaryExpectation) {
      onProfileUpdate({ salaryExpectation: userMessage });
      addMessage('Understood. Is there anything else you would like to add before I find suitable jobs for you?', 'bot');
    } else {
      setIsLoading(true);
      addMessage('Please give me some time to search my knowledge base and find best recommended jobs for you.', 'bot');
      
      setTimeout(() => {
        setIsLoading(false);
        onConversationStateChange('results');
      }, 3000);
    }
  };

  const handleHousingSearch = async (userMessage: string) => {
    if (!userProfile.householdInfo) {
      const familyInfo = uploadedFile ? 
        'Based on uploaded document: Spouse: Nami, Daughter: Hina (age 1)' : 
        userMessage;
      
      onProfileUpdate({ 
        householdInfo: familyInfo,
        spouse: 'Nami',
        children: [{ name: 'Hina', age: 1 }]
      });
      addMessage('Can you provide the neighbourhood and the city you would like to live in?', 'bot');
    } else if (!userProfile.preferredLocation) {
      onProfileUpdate({ preferredLocation: userMessage });
      addMessage('Do you have any pets?', 'bot');
    } else if (userProfile.hasPets === undefined) {
      onProfileUpdate({ hasPets: userMessage.toLowerCase() === 'yes' });
      addMessage('What\'s your maximum rent budget?', 'bot');
    } else if (!userProfile.rentBudget) {
      onProfileUpdate({ rentBudget: userMessage });
      addMessage('Any housing preferences you have?', 'bot');
    } else if (!userProfile.housingPreferences) {
      onProfileUpdate({ housingPreferences: userMessage });
      setIsLoading(true);
      addMessage('Let me find the best matching housing for you.', 'bot');
      
      setTimeout(() => {
        setIsLoading(false);
        setShowHousingApplications(true);
        onConversationStateChange('results');
      }, 3000);
    }
  };

  const startRecording = async () => {
    // Clear any previous recording errors
    setRecordingError(null);
    
    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        const errorMsg = 'Audio recording is not supported in your browser.';
        setRecordingError(errorMsg);
        addMessage(errorMsg, 'bot');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(blob);
        
        // Add audio message first
        const newMessage: Message = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type: 'audio',
          content: 'Audio message',
          timestamp: new Date(),
          audioUrl
        };
        
        // Send to transcription API
        try {
          const formData = new FormData();
          formData.append('audio', blob);
          
          const response = await fetch('https://localhost:8000/transcript', {
            method: 'POST',
            body: formData
          });
          
          if (response.ok) {
            const transcription = await response.text();
            newMessage.transcription = transcription;
          }
          
        } catch (error: any) {
          // Only log if it's not a network error (API not available)
          if (error.name !== 'TypeError' && !error.message?.includes('fetch')) {
            console.error('Transcription failed:', error);
          } else {
            console.info('Transcription API not available');
          }
          newMessage.transcription = 'Transcription unavailable';
        }
        
        setMessages(prev => [...prev, newMessage]);
        setAllTextData(prev => prev + '\nAudio: ' + (newMessage.transcription || 'Audio message'));
        
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error: any) {
      let errorMessage = 'Unable to start recording. Please check your microphone settings.';
      
      if (error.name === 'NotAllowedError') {
        errorMessage = 'Microphone access was denied. Please allow microphone access in your browser settings to use voice recording.';
        // Don't log this as an error since it's user-controlled
        console.info('Microphone access denied by user');
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'No microphone found. Please connect a microphone to use voice recording.';
        console.warn('No microphone device found');
      } else if (error.name === 'NotSupportedError') {
        errorMessage = 'Audio recording is not supported in your browser.';
        console.warn('Audio recording not supported');
      } else {
        // Only log unexpected errors
        console.error('Error starting recording:', error);
      }
      
      setRecordingError(errorMessage);
      addMessage(errorMessage, 'bot');
      
      // Clear error after 5 seconds and store timeout ref for cleanup
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
      errorTimeoutRef.current = setTimeout(() => {
        setRecordingError(null);
        errorTimeoutRef.current = null;
      }, 5000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
      setRecordingError(null); // Clear any errors when stopping
      
      // Clear error timeout if recording stopped manually
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
        errorTimeoutRef.current = null;
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleViewHousingApplication = (application: any) => {
    // This will be handled by the HousingApplications component
  };

  const handleDownloadHousingApplication = (application: any) => {
    // Create mock download
    const element = document.createElement('a');
    const file = new Blob([`Housing Application - ${application.managementName}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${application.managementName.replace(/\s+/g, '_')}_Application.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const renderSpecialContent = () => {
    if (isLoading) {
      return <LoadingStates service={currentService} />;
    }

    if (conversationState === 'service-selection') {
      return <ServiceSelection onServiceSelect={handleServiceSelect} />;
    }

    if (conversationState === 'results' && currentService === 'job') {
      return <JobResults 
        userProfile={userProfile} 
        onJobSaved={() => {
          addMessage('I have saved the job, Krishna. You will be able to find it in the job section in the menu.', 'bot');
          addMessage('Would you like help with any other services today?', 'bot');
          onConversationStateChange('service-selection');
        }} 
      />;
    }

    if (conversationState === 'results' && currentService === 'housing' && !showHousingApplications) {
      return <HousingResults 
        userProfile={userProfile} 
        onHousingSaved={() => {
          addMessage('Great! I have saved your housing preference. You can find it in the housing section.', 'bot');
          addMessage('Would you like help with any other services today?', 'bot');
          onConversationStateChange('service-selection');
        }}
      />;
    }

    if (showHousingApplications) {
      return (
        <HousingApplications 
          onViewApplication={handleViewHousingApplication}
          onDownloadApplication={handleDownloadHousingApplication}
        />
      );
    }

    return null;
  };

  const renderMessage = (message: Message) => {
    if (message.type === 'audio') {
      return (
        <div className={`flex justify-end`}>
          <Card className="max-w-[80%] p-3 bg-primary text-primary-foreground">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm">🎵 Audio message</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedAudio(expandedAudio === message.id ? null : message.id)}
                  className="p-1 h-auto text-primary-foreground hover:bg-primary-foreground/20"
                >
                  {expandedAudio === message.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>
              
              {message.audioUrl && (
                <audio controls className="w-full">
                  <source src={message.audioUrl} type="audio/wav" />
                </audio>
              )}
              
              {expandedAudio === message.id && message.transcription && (
                <div className="mt-2 p-2 bg-primary-foreground/20 rounded text-sm">
                  <p className="font-medium mb-1">Transcription:</p>
                  <p>{message.transcription}</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
        <Card className={`max-w-[80%] p-3 ${
          message.type === 'user' 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted'
        }`}>
          <p className="text-sm">{message.content}</p>
        </Card>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Fixed Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card sticky top-0 z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuOpen}
          className="p-2"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <h1 className="text-lg">Navi Assistant</h1>
        
        <Settings
          language={language}
          onLanguageChange={onLanguageChange}
          audioOption={audioOption}
          onAudioOptionChange={onAudioOptionChange}
          onDeleteAccount={onDeleteAccount}
          onSignOut={onSignOut}
        />
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden relative">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4 pb-20">
            {messages.map((message) => (
              <div key={message.id}>
                {renderMessage(message)}
              </div>
            ))}
            
            {renderSpecialContent()}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* File Upload Display */}
      {uploadedFile && (
        <div className="px-4 py-2 bg-accent/50 border-t sticky bottom-16 z-40">
          <div className="flex items-center space-x-2 text-sm">
            <FileText className="w-4 h-4" />
            <span>Ready to upload: {uploadedFile.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUploadedFile(null)}
              className="p-1 h-auto"
            >
              ×
            </Button>
          </div>
        </div>
      )}

      {/* Fixed Input */}
      <div className="p-4 border-t bg-card sticky bottom-0 z-40">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="p-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4" />
          </Button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.mp3,.wav,.mp4"
            className="hidden"
          />
          
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          
          <Button 
            variant="outline" 
            size="sm" 
            className={`p-2 ${recordingError ? 'border-red-500' : ''} ${isRecording ? 'bg-red-50 border-red-500' : ''}`}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={!!recordingError && !isRecording}
            title={isRecording ? 'Stop recording' : recordingError || 'Start voice recording'}
          >
            {isRecording ? (
              <MicOff className="w-4 h-4 text-red-500 animate-pulse" />
            ) : (
              <Mic className={`w-4 h-4 ${recordingError ? 'text-red-500' : ''}`} />
            )}
          </Button>
          
          <Button size="sm" onClick={handleSendMessage} className="p-2">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}