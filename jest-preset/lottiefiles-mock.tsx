import { jest } from '@jest/globals';
import React from 'react';

jest.mock('@lottiefiles/react-lottie-player', () => ({
  Player: jest.fn(() => <></>),
}));
