import { useState, type FormEvent } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Mail,
  MessageSquare,
  Youtube,
} from 'lucide-react';
import { PROFILE } from '../../data/portfolio';

function formatDisplayHost(url: string): string {
  try {
    const parsed = new URL(url);
    return `${parsed.hostname.replace(/^www\./, '')}${parsed.pathname.replace(/\/$/, '')}`;
  } catch {
    return url;
  }
}

export function ContactSection() {
  const [senderName, setSenderName] = useState('');
  const [topic, setTopic] = useState('AI-Assisted Software / Product Collaboration');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const formattedBrief = [
    `Topic: ${topic}`,
    `From: ${senderName.trim() || 'Visitor'}`,
    '',
    message.trim() ||
      'Hi Joel, I explored your Digital Workshop and would love to discuss a project or collaboration.',
  ].join('\n');

  const handleComposeSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (PROFILE.links.email) {
      const subject = encodeURIComponent(`[Digital Workshop] ${topic}`);
      const body = encodeURIComponent(formattedBrief);
      window.location.href = `mailto:${PROFILE.links.email}?subject=${subject}&body=${body}`;
      return;
    }

    await handleCopyBrief();
  };

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(formattedBrief);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(false);
    }
  };

  const socialChannels = [
    {
      key: 'github',
      label: 'GitHub',
      url: PROFILE.links.github,
      icon: Github,
    },
    {
      key: 'x',
      label: 'X (Twitter)',
      url: PROFILE.links.x,
      icon: MessageSquare,
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      url: PROFILE.links.linkedin,
      icon: Linkedin,
    },
    {
      key: 'youtube',
      label: 'YouTube · MySQL & Tech Tutorials',
      url: PROFILE.links.youtube,
      icon: Youtube,
    },
    {
      key: 'tiktok',
      label: 'TikTok',
      url: PROFILE.links.tiktok,
      icon: Globe,
    },
  ].filter((item): item is { key: string; label: string; url: string; icon: typeof Github } =>
    Boolean(item.url),
  );

  return (
    <>
      <div className="dossier-card">
        <div className="dossier-heading">
          <h3>Let&apos;s Build Something Useful</h3>
          <span className="status-badge status-badge--active">Open to Collaborate</span>
        </div>
        <p className="dossier-text">
          Whether you are collaborating on a practical software product, exploring disciplined
          AI-assisted engineering workflows, organizing developer community sessions, or
          connecting over technical content, reach out through any verified channel below.
        </p>
      </div>

      <div className="channel-list" aria-label="Verified contact and social links">
        {PROFILE.links.email && (
          <a href={`mailto:${PROFILE.links.email}`} className="channel-card">
            <div>
              <span className="channel-label">Direct Email</span>
              <span className="channel-value">{PROFILE.links.email}</span>
            </div>
            <span className="channel-icon">
              <Mail size={16} />
              <ExternalLink size={13} />
            </span>
          </a>
        )}

        {socialChannels.map(({ key, label, url, icon: Icon }) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="channel-card"
          >
            <div>
              <span className="channel-label">{label}</span>
              <span className="channel-value">{formatDisplayHost(url)}</span>
            </div>
            <span className="channel-icon">
              <Icon size={16} />
              <ExternalLink size={13} />
            </span>
          </a>
        ))}
      </div>

      <div className="dossier-card">
        <h4 className="dossier-section-label">Collaboration Brief Composer</h4>
        <form className="brief-form" onSubmit={handleComposeSubmit}>
          <div className="field-group">
            <label htmlFor="brief-name">Your Name</label>
            <input
              id="brief-name"
              type="text"
              className="field-input"
              placeholder="e.g. Sarah Nakato"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />
          </div>

          <div className="field-group">
            <label htmlFor="brief-topic">Conversation Focus</label>
            <select
              id="brief-topic"
              className="field-select"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              <option value="AI-Assisted Software / Product Collaboration">
                AI-Assisted Software / Product Collaboration
              </option>
              <option value="Software Engineering Opportunity">
                Software Engineering Opportunity
              </option>
              <option value="Developer Community / Speaking">
                Developer Community / Speaking
              </option>
              <option value="YouTube / Technical Education">
                YouTube / Technical Education
              </option>
            </select>
          </div>

          <div className="field-group">
            <label htmlFor="brief-message">Project or Idea Outline</label>
            <textarea
              id="brief-message"
              className="field-textarea"
              placeholder="Share what you are building or how we can work together..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="link-row">
            {PROFILE.links.email && (
              <button type="submit" className="btn-primary">
                <Mail size={15} />
                <span>Open Email Draft</span>
              </button>
            )}

            <button type="button" className="btn-secondary" onClick={handleCopyBrief}>
              {copied ? (
                <>
                  <Check size={14} />
                  <span>Brief Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Brief</span>
                </>
              )}
            </button>
          </div>
          <p className="meta-note">
            Public profile links are loaded from <code>VITE_PUBLIC_*</code> environment
            configuration with URL validation and safe fallbacks.
          </p>
        </form>
      </div>
    </>
  );
}
