module.exports = (temp, data) => {
	let output = temp.replace(/{%NAME%}/g, data.name);
	output = output.replace(/{%PHOTO%}/g, data.photo);
	output = output.replace(/{%ADDRESS%}/g, data.address);
	output = output.replace(/{%PHONE%}/g, data.phone);
	output = output.replace(/{%GITHUB%}/g, data.github);
	output = output.replace(/{%LINKEDIN%}/g, data.linkedin);
	output = output.replace(/{%EMAIL%}/g, data.email);
	output = output.replace(/{%SKILLS%}/g, data.skills);
	output = output.replace(/{%LEVEL%}/g, data.level);
	output = output.replace(/{%TYPE%}/g, data.type);
	output = output.replace(/{%INFO%}/g, data.info);
	return output;
};
