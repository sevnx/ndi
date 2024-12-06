import { Metadata } from 'next'
import NightmareCookie from '@/components/nightmare-cookie'

export const metadata: Metadata = {
  title: 'Nightmare Cookie',
}

export default function NightmareCookiePage() {
  return <NightmareCookie />
};
