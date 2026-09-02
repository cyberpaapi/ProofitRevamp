declare module "sharp" {
  type SharpInstance = {
    rotate(): SharpInstance;
    webp(options?: Record<string, unknown>): SharpInstance;
    avif(options?: Record<string, unknown>): SharpInstance;
    png(options?: Record<string, unknown>): SharpInstance;
    jpeg(options?: Record<string, unknown>): SharpInstance;
    toFile(path: string): Promise<unknown>;
    toBuffer(): Promise<Buffer>;
  };

  export default function sharp(input?: Uint8Array | ArrayBuffer): SharpInstance;
}
