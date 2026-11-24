# Firestore Security Specification (`ranking`)

## 1. Data Invariants
- Collection path: `/ranking/{rankingId}` where `rankingId` matches `^[a-zA-Z0-9_\-]+$` (<= 128 chars).
- Allowed fields on `create`: strictly `['nome', 'pontuacao', 'criadoEm']` (no extra or shadow fields).
- `nome`: `string`, length between `2` and `40` characters, and trimmed length >= 2 (rejects blank-only strings).
- `pontuacao`: `number`, strictly positive (`> 0`) and bounded (`<= 100000000`).
- `criadoEm`: `timestamp` equal to `request.time` (`serverTimestamp()`), preventing forged tie-breaker timestamps.
- Read access: public `get` (on valid IDs) and public `list` so real-time `onSnapshot` Top 10 queries work for all visitors.
- Mutations: `update` and `delete` are denied (`false`) to preserve leaderboard integrity and tie-break order.

## 2. Adversarial Payloads ("Dirty Dozen") Expected to Fail (`PERMISSION_DENIED`)
1. **Short name**: `{ nome: "A", pontuacao: 100, criadoEm: serverTimestamp() }`
2. **Whitespace-only name**: `{ nome: "   ", pontuacao: 100, criadoEm: serverTimestamp() }`
3. **Oversized name (> 40 chars)**: `{ nome: "Nome Muito Longo Com Mais De Quarenta Caracteres", pontuacao: 100, criadoEm: serverTimestamp() }`
4. **Non-string name**: `{ nome: 12345, pontuacao: 100, criadoEm: serverTimestamp() }`
5. **Zero score**: `{ nome: "Maria", pontuacao: 0, criadoEm: serverTimestamp() }`
6. **Negative score**: `{ nome: "Maria", pontuacao: -50, criadoEm: serverTimestamp() }`
7. **String score**: `{ nome: "Maria", pontuacao: "500", criadoEm: serverTimestamp() }`
8. **Missing required field (`criadoEm`)**: `{ nome: "Maria", pontuacao: 500 }`
9. **Shadow/ghost field**: `{ nome: "Maria", pontuacao: 500, criadoEm: serverTimestamp(), isAdmin: true }`
10. **Forged past timestamp (tie-break cheating)**: `{ nome: "Maria", pontuacao: 500, criadoEm: Timestamp.fromMillis(1000) }`
11. **Client-side update tampering**: `updateDoc(doc(db, 'ranking', id), { pontuacao: 99999 })`
12. **Client-side delete attempt**: `deleteDoc(doc(db, 'ranking', id))`
