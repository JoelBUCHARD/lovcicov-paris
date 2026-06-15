CREATE TABLE public.product_visibility (
  product_handle TEXT PRIMARY KEY,
  visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.product_visibility TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_visibility TO authenticated;
GRANT ALL ON public.product_visibility TO service_role;

ALTER TABLE public.product_visibility ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visibility is readable by everyone"
  ON public.product_visibility FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert visibility"
  ON public.product_visibility FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update visibility"
  ON public.product_visibility FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete visibility"
  ON public.product_visibility FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER set_product_visibility_updated_at
  BEFORE UPDATE ON public.product_visibility
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();