import { test, Browser, Page, expect } from '@playwright/test';
import { Sandbox } from './Pages/SandboxPage';

(async () => {
    let browser: Browser;
    let page: Page;
    let sandbox: Sandbox;

    test.describe('Acciones en el Automation Sandbox', () => {

        test.beforeEach(async ({ page }) => {
            sandbox = new Sandbox(page);

            await test.step('Navego al sandbox de Free Rage Tester', async () => {
                 await page.goto('');
            })
        })


        test('Click en Boton ID Dinamico', async ({ page }) => {

            await test.step('Puedo hacer click en el Boton con ID dinamico', async () => {
                await sandbox.dinamicoID();
                await expect(sandbox.idDinamico, 'El texto no lo muestra Correctamente').toBeVisible();
            })

        })

        test('Lleno un campo de texto en Automation Sandbox', async ({ page }) => {

            await test.step('Puedo ingresar texto en el campo Un Aburrido Texto', async () => {
                await expect(sandbox.aburridoTexto, 'El campo de texto no admite edicion').toBeEditable();
                await sandbox.aburridoTexto.fill('Estoy aprendiendo Playwright 🚀')
                await expect(sandbox.aburridoTexto, 'El campo de texto no admite edicion').toHaveValue('Estoy aprendiendo Playwright 🚀')
            })
        })

        test('Puedo Seleccionar y Deseleccionar Checkboxes', async ({ page }) => {

            await test.step('Puedo Seleccionar el checkbox para pasta', async () => {
                await sandbox.checkPasta();
                await expect(sandbox.pastaCheckbox, 'El checkbox no estaba seleccionado').toBeChecked();
            })

            await test.step('Puedo Deseleccionar el Checkbox Pasta', async () => {

                await sandbox.unCheckPasta();
                await expect(sandbox.pastaCheckbox).not.toBeChecked();
            })
        })

        test('Puedo Seleccionar Radio Buttons', async ({ page }) => {

            await test.step('Puedo Seleccionar el Radio Button para NO', async () => {
                await sandbox.checkRadioButtonNo();
                await expect(sandbox.radioButtonNo, 'El radio button no se SELECCIONO').toBeChecked();
            })

        })

        test('Puedo seleccionar un item del Dropdwn', async ({ page }) => {

            await test.step('Selecciono un Deporte del dropdown', async () => {
                await sandbox.dropSelect();
            })

        })

        test('validar los valores dentro del Dropdwn', async ({ page }) => {

            await test.step('Valido que la lista del dropdown contiene los deportes esperados', async () => {
                const deportes = ['Fútbol', 'Tennis', 'Basketball']

                for (let opcion of deportes) {
                    const element = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);
                    if (element) {
                        console.log(`La opción '${opcion}' está presente.`);
                    } else {
                        throw new Error(`La opción '${opcion}' no está presente.`);
                    }
                }

            })
        })

        test('Valido Columnas con Nombres de la tabla estatica', async ({ page }) => {

            await test.step('Puedo Validar los elementos para la columna Nombre de la tabla estatica', async () => {
                const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
                const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];

                expect(valoresColumnaNombres).toEqual(nombresEsperados);
            })
        })

        test('Vaido que todo los Valores cambian en la tabla dinamica luego de un reload', async ({ page }) => {

            await test.step('Valido que los vaores cambiaron al Hacer un reload a a web', async () => {
                const valoresTabaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresTabaDinamica);

                await page.reload();

                const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
                console.log(valoresPostReload);

                expect(valoresTabaDinamica).not.toEqual(valoresPostReload);

            })

        })

        test('Ejemplo de Soft Assertions', async ({ page }) => {

            await test.step('Valido que todos los elementos de los checkboxes son los correctos', async () => {
                await expect.soft(sandbox.pizzaCheckbox, 'No se encontro la pizza').toBeVisible();
                await expect.soft(sandbox.hamburguesaCheckbox, 'No se encontro la Hamburguesa').toBeVisible();
                await expect.soft(sandbox.pastaCheckbox, 'No se encontro la Pasta').toBeVisible();
                await expect.soft(sandbox.heladoCheckbox, 'No se encontro el Helado').toBeVisible();
                await expect.soft(sandbox.tortaCheckbox, 'No se encontro la Torta').toBeVisible();
            })
        });

        test('Validando dentro de un Popup', async ({ page }) => {

            await test.step('Cuando hago click en el Boton Popup', async () => {
                await sandbox.popUpClick();
            })

            await test.step('Puedo Validar un Elemento dentro del Popup', async () => {
                await expect(sandbox.textoPopUP, 'El mensaje no es el indicado').toHaveText('¿Viste? ¡Apareció un Pop-up!');
                await sandbox.popUpCerrar();
            });
        });

        test('Puedo seleccionar un dia del Dropdwn Dia de la Semana', async ({ page }) => {
            await test.step('Selecciono un dia de la semana del dropdown', async () => {
                await sandbox.selectDia();
            });
        });     
    });

})();