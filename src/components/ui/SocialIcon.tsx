import {
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaYoutube,
  FaTiktok,
} from 'react-icons/fa'

export interface SocialIconProps {
  platform: string
  className?: string
}

export function SocialIcon({ platform, className = 'w-5 h-5' }: SocialIconProps) {
  const iconMap: Record<string, React.ReactNode> = {
    Twitter: <FaTwitter className={className} />,
    Facebook: <FaFacebook className={className} />,
    LinkedIn: <FaLinkedin className={className} />,
    Instagram: <FaInstagram className={className} />,
    GitHub: <FaGithub className={className} />,
    YouTube: <FaYoutube className={className} />,
    TikTok: <FaTiktok className={className} />,
  }

  return iconMap[platform] || <FaTwitter className={className} />
}
