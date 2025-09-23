class ConversionController {
  getConversion = async () => {
    const conversion = Math.floor(Math.random() * (400 - 100 + 1)) + 100;

    return {
      status: 200,
      message: { conversao: conversion },
    };
  };
}

export default new ConversionController();
