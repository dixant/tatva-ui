import { useState } from 'react';
import { Alert } from '../components/Alert';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import { Divider } from '../components/Divider';
import { Icon } from '../components/Icon';
import { Input } from '../components/Input';
import { Stack } from '../components/Stack';
import { Typography } from '../components/Typography';

export interface LoginBlockProps {
  onSubmit?: (creds: {
    email: string;
    password: string;
    remember: boolean;
  }) => void;
  onOAuth?: (provider: 'google' | 'github') => void;
  error?: string;
  loading?: boolean;
}

/**
 * Login block — a complete auth screen composed of Tatva primitives.
 * Copy this file, tweak, ship.
 */
export function LoginBlock({
  onSubmit,
  onOAuth,
  error,
  loading,
}: LoginBlockProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'var(--tatva-color-bg-subtle)',
        padding: 'var(--tatva-space-4)',
      }}
    >
      <Card variant="elevated" padding="lg" style={{ width: 400 }}>
        <Stack gap="4">
          <Stack gap="2" align="center">
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--tatva-radius-md)',
                background: 'var(--tatva-color-primary-600)',
                color: '#fff',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 700,
              }}
              aria-hidden="true"
            >
              त
            </div>
            <Typography variant="h3">Welcome back</Typography>
            <Typography variant="body2" color="--tatva-color-fg-muted">
              Sign in to continue to your dashboard
            </Typography>
          </Stack>

          {error && <Alert variant="error">{error}</Alert>}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit?.({ email, password, remember });
            }}
          >
            <Stack gap="3">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Checkbox
                  label="Remember me"
                  checked={remember}
                  onChange={(v) => setRemember(v)}
                />
                <a
                  href="#"
                  style={{
                    color: 'var(--tatva-color-primary-700)',
                    fontSize: 14,
                  }}
                >
                  Forgot password?
                </a>
              </div>
              <Button type="submit" fullWidth loading={loading}>
                Sign in
              </Button>
            </Stack>
          </form>

          <Divider label="or continue with" />

          <Stack direction="horizontal" gap="2">
            <Button
              variant="outline"
              fullWidth
              leftIcon={<Icon name="user" size="sm" />}
              onClick={() => onOAuth?.('google')}
            >
              Google
            </Button>
            <Button
              variant="outline"
              fullWidth
              leftIcon={<Icon name="settings" size="sm" />}
              onClick={() => onOAuth?.('github')}
            >
              GitHub
            </Button>
          </Stack>

          <Typography variant="caption" align="center">
            Don&apos;t have an account?{' '}
            <a href="#" style={{ color: 'var(--tatva-color-primary-700)' }}>
              Sign up
            </a>
          </Typography>
        </Stack>
      </Card>
    </div>
  );
}
