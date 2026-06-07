import { expect, test } from "@playwright/test";

test("phrase browser supports the critical web journey", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Polite — розмовні пакети" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Автосервіс/ })).toBeVisible();

  await page.getByRole("button", { name: /Ринок \/ магазин/ }).click();
  await expect(page.getByRole("heading", { name: /Ринок \/ магазин/ })).toBeVisible();

  await page.getByRole("button", { name: /Автосервіс/ }).click();
  await page.getByLabel("Пошук по українському або словацькому тексту").fill("діагностика");
  await expect(page.getByText("Koľko stojí diagnostika?")).toBeVisible();

  await page.getByLabel("Пошук по українському або словацькому тексту").fill("zz-no-results");
  await expect(page.getByText("Нічого не знайдено за запитом.")).toBeVisible();

  await page.getByLabel("Пошук по українському або словацькому тексту").fill("");
  await page.getByRole("button", { name: "Великий текст" }).click();
  await expect(page.getByRole("button", { name: "Звичайний текст" })).toBeVisible();

  await page
    .getByRole("button", { name: /Озвучити/ })
    .first()
    .click();
  await page
    .getByRole("button", { name: /Копіювати/ })
    .first()
    .click();
  await expect(page.getByText("Chcel by som sa objednať na servis.")).toBeVisible();

  await page.getByLabel("Мова інтерфейсу").selectOption("en");
  await expect(page.getByRole("heading", { name: "Polite — phrase packs" })).toBeVisible();
  await expect(page.getByLabel("Interface language")).toHaveValue("en");
});
