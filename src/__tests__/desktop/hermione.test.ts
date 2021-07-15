import { assert } from 'chai'

describe('hermione tests', function () {
    const BASE_URL = 'http://localhost:8080/'
    const repoName = 'octocat/Spoon-Knife'
    const buildCommand = 'echo "test echo"'
    const branchName = 'master'

    it('ввод новых настроек', async function () {
        await this.browser.url(BASE_URL)

        const settingsBtn = await this.browser.$('[data-testid="settings-btn"]')
        await settingsBtn.click()

        const submitBtn = await this.browser.$('[data-testid="submit-btn"]')
        await submitBtn.waitForClickable({ timeout: 10000 })

        const repoInput = await this.browser.$('[data-testid="repo-input"]')
        const buildCommandInput = await this.browser.$('[data-testid="build-command-input"]')
        const branchNameInput = await this.browser.$('[data-testid="branch-name-input"]')

        await repoInput.setValue(repoName)
        await buildCommandInput.setValue(buildCommand)
        await branchNameInput.setValue(branchName)

        await submitBtn.click()
        await submitBtn.waitForClickable({ timeout: 10000 })

        assert.equal(await repoInput.getValue(), repoName)
        assert.equal(await buildCommandInput.getValue(), buildCommand)
        assert.equal(await branchNameInput.getValue(), branchName)
    })

    it('получение новых билдов нажатием на "show more"', async function () {
        // перед тем как получать билды надо получить настройки
        await this.browser.url(BASE_URL)

        const settingsBtn = await this.browser.$('[data-testid="settings-btn"]')
        await settingsBtn.click()

        const submitBtn = await this.browser.$('[data-testid="submit-btn"]')
        await submitBtn.waitForClickable({ timeout: 10000 })

        const repoInput = await this.browser.$('[data-testid="repo-input"]')
        const buildCommandInput = await this.browser.$('[data-testid="build-command-input"]')
        const branchNameInput = await this.browser.$('[data-testid="branch-name-input"]')

        await repoInput.setValue(repoName)
        await buildCommandInput.setValue(buildCommand)
        await branchNameInput.setValue(branchName)

        await submitBtn.click()
        await submitBtn.waitForClickable({ timeout: 10000 })
        // перед тем как получать билды надо получить настройки

        const headerLink = await this.browser.$('.header__link')
        await headerLink.click()

        const showMoreBtn = await this.browser.$('[data-testid="show-more-btn"]')
        await showMoreBtn.waitForDisplayed({ timeout: 1000 })
        await showMoreBtn.waitForClickable({ timeout: 5000 })
        await showMoreBtn.click()

        await this.browser.waitUntil(async () => {
            const builds = await this.browser.$$('.build')
            return builds.length > 25
        }, { interval: 500, timeout: 2000 })
    })
})

