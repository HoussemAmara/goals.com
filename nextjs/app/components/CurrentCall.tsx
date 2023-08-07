"use client"
import Card from '@/app/components/Card';
import CollapsableCard from '@/app/components/CollapsableCard';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Calendar, Clock, Headphones, Mic, MicOff, Pause, PauseCircle, Phone, PhoneForwarded, PhoneOff, Users } from 'react-feather';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneSlash } from '@fortawesome/free-solid-svg-icons';
import { useRouter, useSearchParams } from 'next/navigation';

function CurrentCall() {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<any[]>([]);
  const searchParams = useSearchParams()
  const number = searchParams.get('number')


  useEffect(() => {
    if (mediaStream && isRecording) {
      startRecording();
      setStartTime(Date.now());
    } else {
      stopRecording();
      setElapsedTime(0);
      setStartTime(null);
    }
  }, [mediaStream, isRecording]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        const currentTime = Date.now();
        setElapsedTime(Math.floor((currentTime - (startTime as number)) / 1000));
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRecording, startTime]);

  const handleCallInitiation = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing user media:', error);
    }
  };

  const startRecording = () => {
    const mediaRecorder = new MediaRecorder(mediaStream!);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.addEventListener('dataavailable', (event) => {
      chunksRef.current.push(event.data);
    });

    mediaRecorder.addEventListener('stop', () => {
      const recordedBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
      // Do something with the recorded audio blob
      const audioURL = URL.createObjectURL(recordedBlob);
      const a = document.createElement('a');
      a.href = audioURL;
      a.download = 'recorded_audio.webm';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      chunksRef.current = [];
    });

    mediaRecorder.start();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleHangUp = () => {
    stopRecording();
    setMediaStream(null);
    setIsRecording(false);

    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <CollapsableCard title="Current Call" icon={isRecording ? 'phone' : 'phone-slash'}>
      <div className="container">
        <div className="row">
          <div className="col" >
            Outbound: {number}
            <div className="chronometer">
              <Clock size={18} />
              <span>{elapsedTime} seconds</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <button className="btn btn-outline-primary" onClick={handleCallInitiation} disabled={isRecording || mediaStream !== null}>
            <Phone />
            Start Call
          </button>
          <button className="btn btn-outline-primary">
            <Pause />
          </button>
        </div>
        <div className="row">
          <div className="col">
            <button className="btn btn-outline-primary ">
              <MicOff />
              Mute
            </button>
          </div>
          <div className="col">
            <button className="btn btn-outline-primary  ">
              <PhoneForwarded />
              Transfer Call
            </button>
          </div>
        </div>
        <hr />
        <div className="row">
          <button className="btn btn-danger" onClick={handleHangUp}>
            <FontAwesomeIcon icon={faPhoneSlash} />
            End Call
          </button>
        </div>
      </div>
    </CollapsableCard>
  );
}

export default CurrentCall;
