import { expect, test } from '@playwright/test';
import {
  resolvePublicEnv,
  validateEmailAddress,
  validateExternalUrl,
} from '../src/config/publicEnv';

test.describe('Public environment & URL validation', () => {
  test('validates external URLs, emails, and env fallbacks safely', () => {
    expect(validateExternalUrl('https://github.com/jeiso-n')).toBe('https://github.com/jeiso-n');
    expect(validateExternalUrl('tiktok.com/@jeiso_n')).toBe('https://tiktok.com/@jeiso_n');
    expect(validateExternalUrl('javascript:alert(1)')).toBeNull();
    expect(validateExternalUrl('data:text/html,boom')).toBeNull();
    expect(validateExternalUrl('not-a-valid-host')).toBeNull();

    expect(validateEmailAddress('jeisonmuganzi255@gmail.com')).toBe('jeisonmuganzi255@gmail.com');
    expect(validateEmailAddress('invalid-email')).toBeNull();

    const fallbackEnv = resolvePublicEnv({});
    expect(fallbackEnv.name).toBe('Joel Muganzi');
    expect(fallbackEnv.email).toBe('jeisonmuganzi255@gmail.com');
    expect(fallbackEnv.githubUrl).toBe('https://github.com/jeiso-n');
    expect(fallbackEnv.tiktokUrl).toBe('https://www.tiktok.com/@jeiso_n');
    expect(fallbackEnv.navigatorDemoUrl).toBe(
      'https://jeiso-n.github.io/victoria-university-navigator/',
    );

    const customEnv = resolvePublicEnv({
      VITE_PUBLIC_NAME: 'Test Builder',
      VITE_PUBLIC_TIKTOK_URL: 'tiktok.com/@custom',
      VITE_PUBLIC_X_URL: 'javascript:void(0)',
    });
    expect(customEnv.name).toBe('Test Builder');
    expect(customEnv.tiktokUrl).toBe('https://tiktok.com/@custom');
    expect(customEnv.xUrl).toBeNull();
  });
});

test.describe('Joel Muganzi — Digital Workshop Portfolio', () => {
  test('verifies 5-project priority order, AI/Blender/YouTube sections, 6 contact channels & zero console errors', async ({
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
    await startBtn.click();

    // 2. Verify 3D canvas & overview hotspots
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    const box = await canvas.boundingBox();
    expect(box?.width ?? 0).toBeGreaterThan(800);
    expect(box?.height ?? 0).toBeGreaterThan(500);
    await expect(page.getByRole('button', { name: /Inspect Workstation/i })).toBeVisible();

    // 3. Workstation — verify EXACT 5-project order with Victoria University Navigator FIRST and Musomi Manager LAST
    await page.getByRole('button', { name: /01\s*Workstation/i }).click();
    const projectTabs = page.locator('[role="tablist"][aria-label="Select a software project"] [role="tab"]');
    await expect(projectTabs).toHaveCount(5);

    const tabTexts = await projectTabs.allInnerTexts();
    expect(tabTexts[0]).toContain('Victoria University Navigator');
    expect(tabTexts[1]).toContain('CodeSound Sync');
    expect(tabTexts[2]).toContain('TAP Report');
    expect(tabTexts[3]).toContain('Nexus');
    expect(tabTexts[4]).toContain('Musomi Manager');

    // Primary feature project details, live preview image, and dual CTAs
    await expect(page.getByText('PRIMARY FEATURE PROJECT')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Victoria University Navigator' })).toBeVisible();
    const previewImg = page.locator('.project-preview-img');
    await expect(previewImg).toBeVisible();
    await expect
      .poll(() => previewImg.evaluate((el: HTMLImageElement) => el.naturalWidth))
      .toBeGreaterThan(200);

    await expect(page.getByRole('link', { name: /Explore Live Project/i }).first()).toHaveAttribute(
      'href',
      'https://jeiso-n.github.io/victoria-university-navigator/',
    );
    await expect(page.getByRole('link', { name: /View Source Code/i }).first()).toHaveAttribute(
      'href',
      'https://github.com/jeiso-n/victoria-university-navigator',
    );

    // Inspect remaining 4 projects in order
    await projectTabs.nth(1).click();
    await expect(page.getByRole('heading', { name: 'CodeSound Sync' })).toBeVisible();
    await expect(page.getByRole('link', { name: /View Source Code/i })).toHaveAttribute(
      'href',
      'https://github.com/jeiso-n/CodeSoundSync',
    );

    await projectTabs.nth(2).click();
    await expect(page.getByRole('heading', { name: 'TAP Report' })).toBeVisible();
    await expect(page.getByText(/Private repository/i).first()).toBeVisible();

    await projectTabs.nth(3).click();
    await expect(page.getByRole('heading', { name: 'Nexus' })).toBeVisible();
    await expect(page.getByRole('link', { name: /View Source Code/i })).toHaveAttribute(
      'href',
      'https://github.com/jeiso-n/Nexus',
    );

    await projectTabs.nth(4).click();
    await expect(page.getByRole('heading', { name: 'Musomi Manager' })).toBeVisible();
    await expect(page.getByRole('link', { name: /View Source Code/i })).toHaveAttribute(
      'href',
      'https://github.com/jeiso-n/musomi-manager',
    );

    // 4. Field Notebook — education, cybersecurity learning, Blender 3D story, & YouTube Learning Lab
    await page.keyboard.press('2');
    await expect(page.getByRole('heading', { name: 'Field Notebook' })).toBeVisible();
    await expect(
      page.getByText(/Software Engineering Studies — Victoria University/i),
    ).toBeVisible();
    await expect(page.getByText(/Independent Cybersecurity Fundamentals Learning/i)).toBeVisible();
    await expect(page.getByText(/3D & Digital Creativity — Blender and Visual Storytelling/i)).toBeVisible();
    await expect(page.getByText(/MySQL Workbench Beginner Tutorial Series/i)).toBeVisible();

    await expect(page.getByRole('link', { name: /Primary Keys In MySQL Workbench/i })).toHaveAttribute(
      'href',
      'https://www.youtube.com/watch?v=SOe3XJszoKc',
    );
    await expect(page.getByRole('link', { name: /Visit YouTube Channel/i })).toHaveAttribute(
      'href',
      'https://www.youtube.com/@jeison_muganzi',
    );

    // 5. Systems Wall — AI-Powered Engineering + Verified Stack + jump back to Navigator
    await page.getByRole('button', { name: /03\s*Systems Wall/i }).click();
    await expect(
      page.getByRole('heading', { name: /Building With AI\. Engineering With Discipline\./i }),
    ).toBeVisible();
    await page.getByRole('tab', { name: /Cybersecurity Fundamentals/i }).click();
    await expect(page.getByText(/Input and URL validation/i)).toBeVisible();

    await page.getByRole('tab', { name: 'Frontend & 3D' }).click();
    await expect(page.getByText('Blender (Creative Background)')).toBeVisible();
    await page.getByRole('button', { name: 'Victoria University Navigator' }).first().click();
    await expect(page.getByRole('heading', { name: 'Victoria University Navigator' })).toBeVisible();

    // 6. Comms Console — all 6 env-driven verified channels (Email, GitHub, X, LinkedIn, YouTube, TikTok)
    await page.getByRole('button', { name: /04\s*Comms Console/i }).click();
    await expect(page.getByRole('heading', { name: 'Comms Console' })).toBeVisible();

    await expect(page.getByRole('link', { name: /jeisonmuganzi255@gmail\.com/i })).toHaveAttribute(
      'href',
      'mailto:jeisonmuganzi255@gmail.com',
    );
    await expect(page.getByRole('link', { name: /github\.com\/jeiso-n/i })).toHaveAttribute(
      'href',
      'https://github.com/jeiso-n',
    );
    await expect(page.getByRole('link', { name: /x\.com\/jeison_muganzi/i })).toHaveAttribute(
      'href',
      'https://x.com/jeison_muganzi',
    );
    await expect(
      page.getByRole('link', { name: /linkedin\.com\/in\/joel-muganzi-baa824451/i }),
    ).toHaveAttribute('href', 'https://linkedin.com/in/joel-muganzi-baa824451');
    await expect(page.getByRole('link', { name: /youtube\.com\/@jeison_muganzi/i })).toHaveAttribute(
      'href',
      'https://www.youtube.com/@jeison_muganzi',
    );
    await expect(page.getByRole('link', { name: /tiktok\.com\/@jeiso_n/i })).toHaveAttribute(
      'href',
      'https://www.tiktok.com/@jeiso_n',
    );

    // 7. Escape returns to overview & 2D mode toggles cleanly
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
    await expect(
      page.getByRole('navigation', { name: /Workshop station navigation/i }),
    ).toBeVisible();

    await page.getByRole('button', { name: /01\s*Workstation/i }).click();
    await expect(page.getByRole('heading', { name: 'Victoria University Navigator' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Explore Live Project/i }).first()).toBeVisible();

    await page.getByRole('button', { name: /Return to Workshop Overview/i }).first().click();
    expect(errors).toEqual([]);
  });
});
