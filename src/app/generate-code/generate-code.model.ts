export interface AuthorizationCodeCreateDto {
	onsetDate: string;
	physicianLoginName: string;
	physicianCommonName: string;
	physicianEmail: string;
}

export interface AuthorizationCodeResponseDto {
	authorizationCode: string;
}
