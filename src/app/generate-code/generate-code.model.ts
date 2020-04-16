export interface AuthorizationCodeCreateDto {
	symptomDate: string;
	physicianLoginName: string;
	physicianCommonName: string;
	physicianEmail: string;
}

export interface AuthorizationCodeResponseDto {
	authorizationCode: string;
}
