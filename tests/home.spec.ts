import { test } from '@playwright/test'

test('opens the homepage in Safari', async ({ page }) => {
  await page.goto('/')
})
