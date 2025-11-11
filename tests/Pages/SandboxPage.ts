import { type Locator, type Page } from "@playwright/test";

export class Sandbox {
    readonly page: Page;
    readonly idDinamico: Locator;
    readonly aburridoTexto: Locator;
    readonly pizzaCheckbox: Locator;
    readonly hamburguesaCheckbox: Locator;
    readonly pastaCheckbox: Locator;
    readonly heladoCheckbox: Locator;
    readonly tortaCheckbox: Locator;
    readonly radioButtonNo: Locator;
    readonly selectDropdown: Locator;
    readonly clickPopUp: Locator;
    readonly textoPopUP: Locator;
    readonly cerrarPopUp: Locator;
    readonly diaButton: Locator;
    readonly diaClick: Locator;
    
    
    constructor(page: Page) {
        this.page = page;
        this.idDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID' });
        this.aburridoTexto = page.getByRole('textbox', { name: 'Un aburrido texto' });
        this.pizzaCheckbox = page.getByRole('checkbox', { name: 'Pizza 🍕' });
        this.hamburguesaCheckbox = page.getByRole('checkbox', { name: 'Hamburguesa 🍔' })
        this.pastaCheckbox = page.getByRole('checkbox', { name: 'Pasta 🍝' });
        this.heladoCheckbox = page.getByRole('checkbox', { name: 'Helado 🍧' });
        this.tortaCheckbox = page.getByRole('checkbox', { name: 'Torta 🍰' });
        this.radioButtonNo =page.getByRole('radio', { name: 'No' });
        this.selectDropdown = page.getByLabel('Dropdown');
        this.clickPopUp = page.getByRole('button', { name: 'Mostrar popup' });
        this.textoPopUP = page.getByText('¿Viste? ¡Apareció un Pop-up!');
        this.cerrarPopUp = page.getByRole('button', { name: 'Cerrar' });
        this.diaButton = page.getByRole('button', { name: 'Día de la semana' });
        this.diaClick = page.getByRole('link', { name: 'Sábado' });

    }

    async dinamicoID () {
        await this.idDinamico.click();
    }



    async checkPasta() {
        await this.pastaCheckbox.check();
    }

    async unCheckPasta() {
        await this.pastaCheckbox.uncheck();
    }

    async checkRadioButtonNo() {
        await this.radioButtonNo.check();
    }

    async dropSelect() {
        await this.selectDropdown.scrollIntoViewIfNeeded();
        await this.selectDropdown.selectOption('Tennis');
    }

    async popUpClick() {
        await this.clickPopUp.click();
    }

    async popUpTexto() {
        await this.textoPopUP;
    }

    async popUpCerrar() {
        await this.cerrarPopUp.click();
    }

    async selectDia() {
        await this.diaButton.click();
        await this.diaClick.click();
    }

}

