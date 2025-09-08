// src/services/interview/zoomService.ts
import axios from 'axios';
import jwt from 'jsonwebtoken';

export class ZoomService {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl: string = 'https://api.zoom.us/v2';
  
  constructor() {
    this.apiKey = process.env.ZOOM_API_KEY || '';
    this.apiSecret = process.env.ZOOM_API_SECRET || '';
    
    if (!this.apiKey || !this.apiSecret) {
      console.warn('Warning: Zoom API credentials not configured');
    }
  }
  
  private generateJWT(): string {
    const payload = {
      iss: this.apiKey,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 1 hour
    };
    
    return jwt.sign(payload, this.apiSecret);
  }
  
  private async request(method: string, endpoint: string, data?: any) {
    try {
      const token = this.generateJWT();
      
      const response = await axios({
        method,
        url: `${this.baseUrl}${endpoint}`,
        data,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Zoom API error:', error);
      throw new Error('Failed to communicate with Zoom API');
    }
  }
  
  async createMeeting(options: {
    topic: string;
    startTime: string; // ISO format
    duration: number; // minutes
    agenda?: string;
  }) {
    return this.request('POST', '/users/me/meetings', {
      topic: options.topic,
      type: 2, // Scheduled meeting
      start_time: options.startTime,
      duration: options.duration,
      agenda: options.agenda || 'AI Smart Hire Interview',
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        mute_upon_entry: false,
        auto_recording: 'cloud', // Automatically record to Zoom cloud
        waiting_room: true,
      },
    });
  }
  
  async getMeeting(meetingId: string) {
    return this.request('GET', `/meetings/${meetingId}`);
  }
  
  async getRecording(meetingId: string) {
    return this.request('GET', `/meetings/${meetingId}/recordings`);
  }
  
  async getTranscript(recordingId: string) {
    // In a real implementation, you'd use Zoom's transcript API
    // This is a simplified version
    return this.request('GET', `/meetings/recordings/${recordingId}/transcript`);
  }
}