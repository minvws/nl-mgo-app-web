import { faker } from '$test/faker';
import { expect, test, vi } from 'vitest';
import { useParseHealthcareOrganization } from './useParseHealthcareOrganization';

vi.mock('@lingui/react', () => ({
    useLingui: vi.fn(() => ({
        _: vi.fn((x) => x.id),
    })),
}));

test('parses healthcare organization dto', () => {
    const { parseHealthcareOrganization } = useParseHealthcareOrganization();
    const healthcareOrganizationDto = faker.custom.healthcareOrganizationDTO();
    const healthcareOrganization = parseHealthcareOrganization(healthcareOrganizationDto);

    expect(healthcareOrganization.name).toEqual(healthcareOrganizationDto.display_name);
});

test('uses unknown label when name, category or address is missing', () => {
    const { parseHealthcareOrganization } = useParseHealthcareOrganization();
    const healthcareOrganizationDto = faker.custom.healthcareOrganizationDTO();
    healthcareOrganizationDto.display_name = undefined;
    healthcareOrganizationDto.types = undefined;
    healthcareOrganizationDto.addresses = undefined;

    const healthcareOrganization = parseHealthcareOrganization(healthcareOrganizationDto);

    expect(healthcareOrganization.name).toEqual('common.unknown');
    expect(healthcareOrganization.category).toEqual('common.unknown');
    expect(healthcareOrganization.address).toEqual('common.unknown');
});
