const mock = require('./mock');
const { PROVIDER_COMPATIBILITY } = require('./constants')

/*************
 * Gusto
 *************/
test('Compatibility-Company-Gusto, No account name', () => {
    const sandbox = mock.createSandbox(PROVIDER_COMPATIBILITY.gusto, 1)
    expect(sandbox._company.accounts[0].account_name).toBe(null)
})
test('Compatibility-Company-Gusto, Contains departments', () => {
    const sandbox = mock.createSandbox(PROVIDER_COMPATIBILITY.gusto, 1)
    expect(sandbox._company.departments).not.toEqual([])
})
test('Compatibility-Company-Gusto, Directory size=10', () => {
    const sandbox = mock.createSandbox(PROVIDER_COMPATIBILITY.gusto, 10)
    expect(sandbox._directory).toHaveLength(10)
})
test('Compatibility-Company-Gusto, email=@test.com', () => {
    const sandboxGlobal = {
        companyName: 'Test Company',
        companyEmail: 'test.com',
        companyDepartments: [],
        companyLocations: []
    }
    const company = mock.createCompany(sandboxGlobal, PROVIDER_COMPATIBILITY.gusto.company)
    expect(company.primary_email).toContain('@test.com')
})

/*************
 * BambooHR
 *************/
test('Compatibility-Company-BambooHR, Contain account name', () => {
    const sandbox = mock.createSandbox(PROVIDER_COMPATIBILITY.bamboohr, 1)
    expect(sandbox._company.accounts[0].account_name).not.toBe(null)
})
test('Compatibility-Company-BambooHR, Contains departments', () => {
    const sandbox = mock.createSandbox(PROVIDER_COMPATIBILITY.bamboohr, 1)
    expect(sandbox._company.departments).not.toEqual([])
})

/*************
 * Justworks
 *************/
test('Compatibility-Company-Justworks, No account name', () => {
    const sandbox = mock.createSandbox(PROVIDER_COMPATIBILITY.justworks, 1)
    expect(sandbox._company.accounts[0].account_name).toBe(null)
})

/*************
 * Workday
 *************/
test('Compatibility-Company-Workday, Company endpoint not implemented', () => {
    const sandbox = mock.createSandbox(PROVIDER_COMPATIBILITY.workday, 10)
    expect(sandbox._company).toBe(null)
})

export { }