INSERT INTO storage.buckets (id, name, public)
VALUES ('diagram-assets', 'diagram-assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can read diagram assets"
ON storage.objects
FOR SELECT
USING (bucket_id = 'diagram-assets');

CREATE POLICY "Admin can upload diagram assets"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'diagram-assets'
  AND COALESCE(auth.jwt() ->> 'email', '') = 'swapnil.kumar22@alumni.imperial.ac.uk'
);

CREATE POLICY "Admin can update diagram assets"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'diagram-assets'
  AND COALESCE(auth.jwt() ->> 'email', '') = 'swapnil.kumar22@alumni.imperial.ac.uk'
)
WITH CHECK (
  bucket_id = 'diagram-assets'
  AND COALESCE(auth.jwt() ->> 'email', '') = 'swapnil.kumar22@alumni.imperial.ac.uk'
);

CREATE POLICY "Admin can delete diagram assets"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'diagram-assets'
  AND COALESCE(auth.jwt() ->> 'email', '') = 'swapnil.kumar22@alumni.imperial.ac.uk'
);