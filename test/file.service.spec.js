const expect = require('chai').expect

const { describe, it } = require('mocha')
const { getLinesFile } = require('../services/files.service')

describe('getLinesFile function', () => {
  const file = 'test2.csv'
  const assertedResult = {
    file: 'test2.csv',
    lines: [
      {
        text: 'RAxnPUZJxpKBdACJzYnRltYqWedk',
        number: 13985,
        hex: 'ecc9f0f35d5034e0d50343379d0977ac'
      }
    ]
  }

  it('should return correct data when called with valid arguments', () => {
    const data = `file,text,number,hex
    test2.csv,RAxnPUZJxpKBdACJzYnRltYqWedk,13985,ecc9f0f35d5034e0d50343379d0977ac`
    const result = getLinesFile({ file, data })
    // assert(result).toEqual(assertedResult);
    expect(result).to.deep.equals(assertedResult)
    expect(result.lines).to.have.lengthOf(1)
  })

  it('should return correct data when called with valid arguments', () => {
    const data = `file,text,number,hex
    test2.csv,Uxiad
    test2.csv,RAxnPUZJxpKBdACJzYnRltYqWedk,13985,ecc9f0f35d5034e0d50343379d0977ac`
    const result = getLinesFile({ file, data })
    // assert(result).toEqual(assertedResult);
    expect(result).to.deep.equals(assertedResult)
  })

  it('should return an empty array when data is empty', () => {
    const result = getLinesFile({ file, data: '' })
    expect(result).to.deep.equals({ file, lines: [] })
  })

  it('should return an empty array when data is invalid', () => {
    const result = getLinesFile({ file, data: 'invalid data' })
    expect(result).to.deep.equals({ file, lines: [] })
  })

  it('should parse cells with numeric values and should be skip lines', () => {
    const dataWithNumbers = `file,text,number,hex
      test3.csv,ZLMsf
      test3.csv,aXZMIDuMbBTc,652,68322866807a0f9443f4d316920c1faa
      test3.csv,iF,98,33e15a2f00b6e44cf1f7eb2e6752eeeb
      test3.csv,XBNhqGgjdBdtyHJVfSGGCvVz,09025848,bf963e2061602795d268b034f9eefd88`
    const assertedLines = [
      {
        text: 'aXZMIDuMbBTc',
        number: 652,
        hex: '68322866807a0f9443f4d316920c1faa'
      },
      {
        text: 'iF',
        number: 98,
        hex: '33e15a2f00b6e44cf1f7eb2e6752eeeb'
      },
      {
        text: 'XBNhqGgjdBdtyHJVfSGGCvVz',
        number: 9025848,
        hex: 'bf963e2061602795d268b034f9eefd88'
      }
    ]
    const result = getLinesFile({ file, data: dataWithNumbers })
    expect(result.lines).to.deep.equals(assertedLines)
  })

  it('should return an empty array when headers are missing', () => {
    const noHeadersData = `test3.csv,ZLMsf
    test3.csv,aXZMIDuMbBTc,652,68322866807a0f9443f4d316920c1faa
    test3.csv,iF,98,33e15a2f00b6e44cf1f7eb2e6752eeeb
    test3.csv,XBNhqGgjdBdtyHJVfSGGCvVz,09025848,bf963e2061602795d268b034f9eefd88`
    const result = getLinesFile({ file, data: noHeadersData })
    expect(result).to.deep.equals({ file, lines: [] })
  })
})
