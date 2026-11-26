import { useState, type FormEvent } from 'react';
import { Check, Copy, ExternalLink, Github, Linkedin, Mail, Youtube } from 'lucide-react';
import { PROFILE } from '../../data/portfolio';

export function ContactSection() {
  const [senderName, setSenderName] = useState('');
  const [topic, setTopic] = useState('Product Collaboration');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const formattedBrief = [
    `Topic: ${topic}`,
    `From: ${senderName.trim() || 'Visitor'}`,
    '',
    message.trim() || 'Hi Joel, I explored your Digital Workshop and would love to discuss a project or collaboration.',
  ].join('\n');

  const handleComposeSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (PROFILE.links.email) {
      const subject = encodeURIComponent(`[Digital Workshop] ${topic}`);
      const body = encodeURIComponent(formattedBrief);
      window.location.href = `mailto:${PROFILE.links.email}?subject=${subject}&body=${body}`;
      return;
    }

    try {
      await navigator.clipboard.writeText(formattedBrief);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <div className="dossier-card">
        <div className="dossier-heading">
          <h3>Let&apos;s Build Something Useful</h3>
          <span className="status-badge status-badge--active">Open to Collaborate</span>
        </div>
        <p className="dossier-text">
          Whether you are exploring a software product idea, collaborating on developer
          tooling, organizing a tech community event in Uganda, or hiring a product-minded
          engineer, I&apos;d be glad to connect.
        </p>
      </div>

      <div className="channel-list">
        <a
          href={PROFILE.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="channel-card"
        >
          <div>
            <span className="channel-label">GitHub · Verified</span>
            <span className="channel-value">github.com/jeiso-n</span>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--accent-amber)' }}>
            <Github size={16} />
            <ExternalLink size={13} />
          </span>
        </a>

        <a
          href={PROFILE.links.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="channel-card"
        >
          <div>
            <span className="channel-label">YouTube · Ugandan Tech Channel</span>
            <span className="channel-value">youtube.com/@jeiso_n</span>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--accent-amber)' }}>
            <Youtube size={16} />
            <ExternalLink size={13} />
          </span>
        </a>

        {PROFILE.links.email ? (
          <a href={`mailto:${PROFILE.links.email}`} className="channel-card">
            <div>
              <span className="channel-label">Direct Email</span>
              <span className="channel-value">{PROFILE.links.email}</span>
            </div>
            <Mail size={16} color="var(--accent-emerald)" />
          </a>
        ) : (
          <div className="channel-card channel-card--muted">
            <div>
              <span className="channel-label">Direct Email · Configurable</span>
              <span className="channel-value">Set VITE_CONTACT_EMAIL in .env to enable direct mailto</span>
            </div>
            <Mail size={16} color="var(--ink-muted)" />
          </div>
        )}

        {PROFILE.links.linkedin ? (
          <a
            href={PROFILE.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="channel-card"
          >
            <div>
              <span className="channel-label">LinkedIn</span>
              <span className="channel-value">{PROFILE.links.linkedin}</span>
            </div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--accent-amber)' }}>
              <Linkedin size={16} />
              <ExternalLink size={13} />
            </span>
          </a>
        ) : (
          <div className="channel-card channel-card--muted">
            <div>
              <span className="channel-label">LinkedIn · Configurable</span>
              <span className="channel-value">Set VITE_LINKEDIN_URL in .env to publish profile link</span>
            </div>
            <Linkedin size={16} color="var(--ink-muted)" />
          </div>
        )}
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
              <option value="Product Collaboration">Product Collaboration</option>
              <option value="Software Engineering Opportunity">Software Engineering Opportunity</option>
              <option value="Developer Community / Speaking">Developer Community / Speaking</option>
              <option value="Tech YouTube / Content Collab">Tech YouTube / Content Collab</option>
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
            <button type="submit" className="btn-primary">
              {PROFILE.links.email ? (
                <>
                  <Mail size={15} />
                  <span>Open Email Draft</span>
                </>
              ) : copied ? (
                <>
                  <Check size={15} />
                  <span>Brief Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy size={15} />
                  <span>Copy Outreach Brief</span>
                </>
              )}
            </button>
          </div>
          <p className="meta-note">
            No third-party tracking or form servers required. Configure <code>VITE_CONTACT_EMAIL</code> to route directly into your mail client.
          </p>
        </form>
      </div>
    </>
  );
}
