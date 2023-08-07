"use client";
import { useGlobalContext } from '@/app/Context/ImageContext';
import { useEffect, useState } from 'react';
import { Clock } from 'react-feather';
import { BeatLoader } from 'react-spinners';
import { FaCoffee } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Agent() {
  const [outboundCall, setOutboundCall] = useState(false);
  const { setPageNameForHeader, setPageURLForHeader, setPageSectionNameForHeader, setIconForHeader } = useGlobalContext();
  const [firstname, setFirstname] = useState('');
  const [paused, setPaused] = useState(false);
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams()
  const number = searchParams.get('number')


  useEffect(() => {
    setPageSectionNameForHeader('Agents');
    setIconForHeader('users');
    setPageNameForHeader('Agent');
    setPageURLForHeader('agents');

    // Fetching the firstname and username
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/users/user/', { credentials: 'include' });
        const data = await response.json();
        setFirstname(data.first_name);
        setUsername(data.username);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const togglePause = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/updateagentworkstatus/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          work_status: !paused ? 'paused' : 'started',
        }),
      });

      if (response.ok) {
        setPaused(!paused);
      } else {
        console.error('Failed to update status', response.statusText);
      }
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  const simulateCall = () => {
    if (phoneNumber.trim() !== '') {
      const encodedPhoneNumber = encodeURIComponent(phoneNumber.trim());
      setOutboundCall(true);
      router.push(`/agent?number=${encodedPhoneNumber}`);
    }
  };

  useEffect(() => {
    if (outboundCall && !paused) {
      // Perform additional logic for the outbound call
    }
  }, [outboundCall, paused]);

  return (
    <div >
      <h2 >
        Hello {firstname}
      </h2>
      <div ></div>
      <h5 >
        You are {paused ? 'paused' : 'waiting for a call'}
      </h5>
      <p >
        {paused ? 'You are currently on pause. Click the button to resume.' : 'Please stay tuned. An incoming call will be assigned to you shortly.'}
      </p>
      <div >
        {!paused && (
          <BeatLoader color="#007BFF" loading={!outboundCall} size={24} />
        )}
        {outboundCall && paused && (
          <Clock size={64} />
        )}
      </div>

      <div >
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />
        <button
          onClick={simulateCall}
        >
          Simulate
        </button>
      </div>

      <button
        onClick={togglePause}
      >
        {paused ? 'Start' : <FaCoffee />}
      </button>
    </div>
  );
}
