import { Metadata } from 'next';
import CaptchaGame from '@/components/captcha-game';

export const metadata: Metadata = {
  title: 'Captcha',
};

export default function Captcha() {
  return (
    <CaptchaGame />
  );
};
