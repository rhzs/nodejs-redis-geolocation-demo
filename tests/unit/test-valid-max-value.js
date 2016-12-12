import test from 'ava'
import {MAX_INTEGER_VALUE_INPUT} from '../../src/utils'

test('Testing valid maximum integer value: MAX_INTEGER_VALUE_INPUT', t => {
  t.plan(1)
  t.is(999999999, MAX_INTEGER_VALUE_INPUT)
})
