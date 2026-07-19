import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Icon } from '../components/Icon';
import { Stack } from '../components/Stack';
import { Typography } from '../components/Typography';

export interface PricingTier {
  name: string;
  price: string;
  interval?: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface PricingBlockProps {
  title?: string;
  subtitle?: string;
  tiers?: PricingTier[];
  onSelect?: (tier: string) => void;
}

const DEFAULT_TIERS: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    interval: '/mo',
    description: 'For side projects and learning.',
    features: ['1 project', 'Community support', 'Basic analytics'],
    cta: 'Get started',
  },
  {
    name: 'Pro',
    price: '$19',
    interval: '/mo',
    description: 'For teams shipping products.',
    features: [
      '10 projects',
      'Priority support',
      'Advanced analytics',
      'Custom domains',
    ],
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$99',
    interval: '/mo',
    description: 'For growing organizations.',
    features: [
      'Unlimited projects',
      'Dedicated support',
      'SSO / SAML',
      'Audit logs',
      'SLA',
    ],
    cta: 'Contact sales',
  },
];

/**
 * PricingBlock — 3-tier pricing table composed of Tatva primitives.
 * Provide your own tiers via props; the default is a sensible starter.
 */
export function PricingBlock({
  title = 'Simple, transparent pricing',
  subtitle = 'Choose the plan that fits your team. Change or cancel anytime.',
  tiers = DEFAULT_TIERS,
  onSelect,
}: PricingBlockProps) {
  return (
    <section
      style={{
        padding: 'var(--tatva-space-12) var(--tatva-space-6)',
        background: 'var(--tatva-color-bg)',
      }}
    >
      <Stack gap="8" align="center" style={{ maxWidth: 1024, margin: '0 auto' }}>
        <Stack gap="2" align="center">
          <Typography variant="h1" align="center">
            {title}
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="--tatva-color-fg-muted"
            style={{ maxWidth: 560 }}
          >
            {subtitle}
          </Typography>
        </Stack>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--tatva-space-4)',
            width: '100%',
          }}
        >
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              variant={tier.highlighted ? 'elevated' : 'outlined'}
              padding="lg"
              style={
                tier.highlighted
                  ? {
                      borderColor: 'var(--tatva-color-primary-500)',
                      boxShadow: 'var(--tatva-shadow-xl)',
                      transform: 'translateY(-4px)',
                    }
                  : undefined
              }
            >
              <Stack gap="4">
                <Stack direction="horizontal" justify="between" align="center">
                  <Typography variant="h4">{tier.name}</Typography>
                  {tier.highlighted && (
                    <Badge variant="solid" color="primary">
                      Popular
                    </Badge>
                  )}
                </Stack>

                <div>
                  <Typography as="span" variant="h1" weight="bold">
                    {tier.price}
                  </Typography>
                  {tier.interval && (
                    <Typography
                      as="span"
                      variant="body2"
                      color="--tatva-color-fg-muted"
                    >
                      {tier.interval}
                    </Typography>
                  )}
                </div>

                <Typography variant="body2" color="--tatva-color-fg-muted">
                  {tier.description}
                </Typography>

                <Stack gap="2">
                  {tier.features.map((f) => (
                    <div
                      key={f}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        color: 'var(--tatva-color-fg)',
                        fontSize: 14,
                      }}
                    >
                      <Icon
                        name="check"
                        size="sm"
                        color="var(--tatva-color-success)"
                      />
                      {f}
                    </div>
                  ))}
                </Stack>

                <Button
                  variant={tier.highlighted ? 'primary' : 'outline'}
                  fullWidth
                  onClick={() => onSelect?.(tier.name)}
                >
                  {tier.cta}
                </Button>
              </Stack>
            </Card>
          ))}
        </div>
      </Stack>
    </section>
  );
}
