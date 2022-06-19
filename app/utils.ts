export function rand(params: { min?: number; max: number }) {
  const min = params.min ?? 0;
  return Math.floor(Math.random() * params.max + min);
}
