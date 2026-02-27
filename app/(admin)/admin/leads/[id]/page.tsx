'use client';


import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  MenuItem,
  TextField,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import ThemeProvider from '../../theme/ThemeProvider';
import AppLayout from '../../../components/Layout/AppLayout';
import { authCookies } from '../../../lib/authCookies';
import api from '../../../lib/apiClient';

interface Lead {
  id: string;
  fullName: string;
  designation?: string;
  organization: string;
  email: string;
  contactNumber?: string;
  countryCode?: string;
  country?: string;
  projectTitle: string;
  scopeOfWork: string;
  deliveryTimeline: string;
  budgetRange?: string;
  referralSource?: string;
  status: string;
  attachments?: { filename: string; size: number; mimeType: string }[];
  remarks?: Remark[];
  createdAt: string;
  updatedAt?: string;
}

interface Remark {
  id?: string;
  text: string;
  createdAt?: string;
  createdBy?: any;
}

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', color: 'default' },
  { value: 'contacted', label: 'Contacted', color: 'info' },
  { value: 'qualified', label: 'Qualified', color: 'warning' },
  { value: 'converted', label: 'Converted', color: 'success' },
  { value: 'rejected', label: 'Rejected', color: 'error' },
];

export default function LeadDetailPage() {
  const router = useRouter();
  const params = useParams();
  const leadId = params?.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [status, setStatus] = useState('');
  const [remarkText, setRemarkText] = useState('');

  useEffect(() => {
    const token = authCookies.getToken();
    if (!token) {
      router.push('/login');
      return;
    }
    if (leadId) {
      fetchLeadDetails();
    }
  }, [leadId, router]);

  const fetchLeadDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(`/rfp/${leadId}`);
      const mapped: Lead = {
        id: String(data._id ?? data.id ?? leadId),
        fullName: data.fullName,
        designation: data.designation,
        organization: data.organization,
        email: data.email,
        contactNumber: data.contactNumber,
        countryCode: data.countryCode,
        country: data.country,
        projectTitle: data.projectTitle,
        scopeOfWork: data.scopeOfWork,
        deliveryTimeline: data.deliveryTimeline,
        budgetRange: data.budgetRange,
        referralSource: data.referralSource,
        status: data.status ?? 'pending',
        attachments: data.attachments || [],
        remarks: data.remarks || [],
        createdAt: data.createdAt
          ? new Date(data.createdAt).toLocaleString()
          : '',
        updatedAt: data.updatedAt
          ? new Date(data.updatedAt).toLocaleString()
          : undefined,
      };
      setLead(mapped);
      setStatus(mapped.status);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to load lead details'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!lead || status === lead.status) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await api.patch(`/rfp/${leadId}`, { status });
      setSuccess('Status updated successfully');
      setLead({ ...lead, status });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to update status'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleAddRemark = async () => {
    if (!remarkText.trim() || !lead) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const { data } = await api.post(`/rfp/${leadId}/remarks`, {
        text: remarkText.trim(),
      });

      const newRemark: Remark = {
        id: data.id || data._id,
        text: remarkText.trim(),
        createdAt: data.createdAt || new Date().toISOString(),
        createdBy: data.createdBy,
      };

      setLead({
        ...lead,
        remarks: [...(lead.remarks || []), newRemark],
      });
      setRemarkText('');
      setSuccess('Remark added successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to add remark'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteRemark = async (remarkId?: string) => {
    if (!remarkId || !lead) return;

    setSaving(true);
    setError('');

    try {
      await api.delete(`/rfp/${leadId}/remarks/${remarkId}`);
      setLead({
        ...lead,
        remarks: lead.remarks?.filter((r) => r.id !== remarkId) || [],
      });
      setSuccess('Remark deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to delete remark'
      );
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (statusValue: string) => {
    const statusOption = STATUS_OPTIONS.find((s) => s.value === statusValue);
    return statusOption?.color || 'default';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <ThemeProvider>
        <AppLayout>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
            }}
          >
            <CircularProgress />
          </Box>
        </AppLayout>
      </ThemeProvider>
    );
  }

  if (!lead) {
    return (
      <ThemeProvider>
        <AppLayout>
          <Box>
            <Alert severity="error">
              {error || 'Lead not found'}
            </Alert>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => router.push('/leads')}
              sx={{ mt: 2 }}
            >
              Back to Leads
            </Button>
          </Box>
        </AppLayout>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <AppLayout>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton onClick={() => router.push('/leads')} sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" component="h1">
              Lead Details
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert
              severity="success"
              sx={{ mb: 2 }}
              onClose={() => setSuccess('')}
            >
              {success}
            </Alert>
          )}

          <Grid container spacing={3}>
            {/* Lead Information */}
            <Grid item xs={12} md={8}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Contact Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          Full Name
                        </Typography>
                      </Box>
                      <Typography variant="body1" fontWeight="medium">
                        {lead.fullName}
                      </Typography>
                    </Grid>
                    {lead.designation && (
                      <Grid item size={{ xs: 12, sm: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            Designation
                          </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight="medium">
                          {lead.designation}
                        </Typography>
                      </Grid>
                    )}
                    <Grid item size={{ xs: 12, sm: 6 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <BusinessIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          Organization
                        </Typography>
                      </Box>
                      <Typography variant="body1" fontWeight="medium">
                        {lead.organization}
                      </Typography>
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          Email
                        </Typography>
                      </Box>
                      <Typography variant="body1" fontWeight="medium">
                        {lead.email}
                      </Typography>
                    </Grid>
                    {lead.contactNumber && (
                      <Grid item size={{ xs: 12, sm: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            Contact Number
                          </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight="medium">
                          {lead.countryCode && `${lead.countryCode} `}
                          {lead.contactNumber}
                        </Typography>
                      </Grid>
                    )}
                    {lead.country && (
                      <Grid item size={{ xs: 12, sm: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            Country
                          </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight="medium">
                          {lead.country}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>

              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Project Details
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Grid container spacing={2}>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AssignmentIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          Project Title
                        </Typography>
                      </Box>
                      <Typography variant="body1" fontWeight="medium">
                        {lead.projectTitle}
                      </Typography>
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <AssignmentIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          Scope of Work
                        </Typography>
                      </Box>
                      <Typography variant="body1">{lead.scopeOfWork}</Typography>
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 6 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <ScheduleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          Delivery Timeline
                        </Typography>
                      </Box>
                      <Typography variant="body1" fontWeight="medium">
                        {lead.deliveryTimeline}
                      </Typography>
                    </Grid>
                    {lead.budgetRange && (
                      <Grid item size={{ xs: 12, sm: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <AttachMoneyIcon sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            Budget Range
                          </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight="medium">
                          {lead.budgetRange}
                        </Typography>
                      </Grid>
                    )}
                    {lead.referralSource && (
                      <Grid item size={{ xs: 12, sm: 6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            Referral Source
                          </Typography>
                        </Box>
                        <Typography variant="body1" fontWeight="medium">
                          {lead.referralSource}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>

              {lead.attachments && lead.attachments.length > 0 && (
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Attachments
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <List>
                      {lead.attachments.map((file, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={file.filename}
                            secondary={`${formatFileSize(file.size)} • ${file.mimeType}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              )}
            </Grid>

            {/* Status Update & Remarks */}
            <Grid item xs={12} md={4}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Status
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={
                        STATUS_OPTIONS.find((s) => s.value === lead.status)?.label ||
                        lead.status
                      }
                      color={getStatusColor(lead.status) as any}
                      sx={{ mb: 2 }}
                    />
                  </Box>
                  <TextField
                    select
                    fullWidth
                    label="Update Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    SelectProps={{
                      native: false,
                    }}
                    sx={{ mb: 2 }}
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleStatusUpdate}
                    disabled={saving || status === lead.status}
                  >
                    {saving ? 'Saving...' : 'Update Status'}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Remarks
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Add Remark"
                    value={remarkText}
                    onChange={(e) => setRemarkText(e.target.value)}
                    placeholder="Enter your remark here..."
                    sx={{ mb: 2 }}
                  />
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<CommentIcon />}
                    onClick={handleAddRemark}
                    disabled={saving || !remarkText.trim()}
                  >
                    Add Remark
                  </Button>

                  {lead.remarks && lead.remarks.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Previous Remarks
                      </Typography>
                      <List>
                        {lead.remarks.map((remark, index) => (
                          <Paper
                            key={remark.id || index}
                            sx={{ p: 2, mb: 1, bgcolor: 'grey.50' }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                              }}
                            >
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="body2">{remark.text}</Typography>
                                {remark.createdAt && (
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ mt: 0.5, display: 'block' }}
                                  >
                                    {new Date(remark.createdAt).toLocaleString()}
                                    {(remark.createdBy && remark.createdBy.fullName) && ` • by ${remark.createdBy.fullName}`}
                                  </Typography>
                                )}
                              </Box>
                              {remark.id && (
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteRemark(remark.id)}
                                  disabled={saving}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              )}
                            </Box>
                          </Paper>
                        ))}
                      </List>
                    </Box>
                  )}
                </CardContent>
              </Card>

              <Card sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    Created: {lead.createdAt}
                  </Typography>
                  {lead.updatedAt && (
                    <Typography variant="subtitle2" color="text.secondary">
                      Updated: {lead.updatedAt}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </AppLayout>
    </ThemeProvider>
  );
}

