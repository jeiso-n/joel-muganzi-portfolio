import { expect, test } from '@playwright/test';

test.describe('Joel Muganzi — Digital Workshop Portfolio', () => {
  test('renders intro, enters 3D workshop, verifies all stations & zero console errors', async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', (err) => {
      pageErrors.push(err.message);
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    // 1. Intro sequence
    await expect(page.getByRole('heading', { name: 'Joel Muganzi' })).toBeVisible();
    const startBtn = page.getByRole('button', { name: /Start Experience/i });
    await expect(startBtn).toBeEnabled();

    // Enter workshop
    await startBtn.click();

    // 2. Verify 3D canvas & overview HUD + spatial hotspots
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    const box = await canvas.boundingBox();
    expect(box?.width ?? 0).toBeGreaterThan(800);
    expect(box?.height ?? 0).toBeGreaterThan(500);

    await expect(page.getByRole('button', { name: /Inspect Workstation/i })).toBeVisible();

    // 3. Projects station
    await page.getByRole('button', { name: /01\s*Workstation/i }).click();
    await expect(page.getByRole('heading', { name: 'Musomi Manager' })).toBeVisible();
    await expect(page.getByRole('link', { name: /View GitHub Repo/i })).toHaveAttribute(
      'href',
      'https://github.com/jeiso-n/musomi-manager',
    );

    // Switch through all 4 verified projects
    await page.getByRole('tab', { name: /CodeSound Sync/i }).click();
    await expect(page.getByRole('heading', { name: 'CodeSound Sync' })).toBeVisible();
    await expect(page.getByRole('link', { name: /View GitHub Repo/i })).toHaveAttribute(
      'href',
      'https://github.com/jeiso-n/CodeSoundSync',
    );

    await page.getByRole('tab', { name: /TAP Report/i }).click();
    await expect(page.getByRole('heading', { name: 'TAP Report' })).toBeVisible();
    await expect(page.getByText(/Private repository/i)).toBeVisible();

    await page.getByRole('tab', { name: /Nexus/i }).click();
    await expect(page.getByRole('heading', { name: 'Nexus' })).toBeVisible();
    await expect(page.getByRole('link', { name: /View GitHub Repo/i })).toHaveAttribute(
      'href',
      'https://github.com/jeiso-n/Nexus',
    );

    // 4. About station via keyboard shortcut '2'
    await page.keyboard.press('2');
    await expect(page.getByRole('heading', { name: 'Field Notebook' })).toBeVisible();
    await expect(page.getByText(/Victoria University/i)).toBeVisible();

    // 5. Tech station via dock & filter + jump to project
    await page.getByRole('button', { name: /03\s*Systems Wall/i }).click();
    await expect(page.getByRole('heading', { name: 'Systems Wall' })).toBeVisible();
    await page.getByRole('tab', { name: 'Backend & Data' }).click();
    await expect(page.getByText('Spring Boot 4')).toBeVisible();

    // Clicking a verified project chip routes to Workstation with that project selected
    await page.getByRole('button', { name: 'TAP Report' }).first().click();
    await expect(page.getByRole('heading', { name: 'TAP Report' })).toBeVisible();

    // 6. Contact station
    await page.getByRole('button', { name: /04\s*Comms Console/i }).click();
    await expect(page.getByRole('heading', { name: 'Comms Console' })).toBeVisible();
    await expect(page.getByRole('link', { name: /github\.com\/jeiso-n/i })).toHaveAttribute(
      'href',
      'https://github.com/jeiso-n',
    );
    await expect(page.getByRole('link', { name: /youtube\.com\/@jeiso_n/i })).toHaveAttribute(
      'href',
      'https://www.youtube.com/@jeiso_n',
    );

    // 7. Escape returns to Overview, and 2D Studio Mode toggle works cleanly
    await page.keyboard.press('Escape');
    await expect(page.getByRole('region')).toHaveCount(0);

    await page.getByRole('button', { name: /2D View/i }).click();
    await expect(page.getByText(/2D Architectural Mode/i)).toBeVisible();
    await page.getByRole('button', { name: /Switch Back to Interactive 3D Studio/i }).click();
    await expect(page.locator('canvas')).toBeVisible();

    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test('supports skip intro and responsive mobile layout cleanly', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    await page.getByRole('button', { name: /Skip intro/i }).click();
    await expect(page.getByRole('navigation', { name: /Workshop station navigation/i })).toBeVisible();

    await page.getByRole('button', { name: /01\s*Workstation/i }).click();
    await expect(page.getByRole('heading', { name: 'Musomi Manager' })).toBeVisible();

    await page.getByRole('button', { name: /Return to Workshop Overview/i }).first().click();
    expect(errors).toEqual([]);
  });
});
