export const untrimmedReplace = ( str: string, replacement: string ): string => {
	const leftTrim = str.substring(
		0,
		str.length - str.trimLeft().length
	)
	const rightTrim = str.substring(
		str.trimRight().length,
		str.length
	)
	
	return `${leftTrim}${replacement}${rightTrim}`
}