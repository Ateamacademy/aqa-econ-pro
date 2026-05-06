UPDATE email_send_state SET batch_size = 100, send_delay_ms = 20, auth_email_ttl_minutes = 30, transactional_email_ttl_minutes = 120 WHERE id = 1;
SELECT cron.alter_job(
  (SELECT jobid FROM cron.job WHERE jobname = 'process-email-queue'),
  schedule := '1 seconds'
);