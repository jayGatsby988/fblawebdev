"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Grid,
  Paper,
  Select,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";
import { jsPDF } from "jspdf";

interface ResumeData {
  name: string;
  experience: string;
  skills: string;
  education: string;
  location: string;
  jobType: string;
  industry: string;
  certifications: string;
  languages: string;
  portfolio: string;
}

const StyledContainer = styled(Container)({
  marginTop: "2rem",
  padding: "2rem",
  backgroundColor: "#e3f2fd",
  borderRadius: "12px",
  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
});

const StyledPaper = styled(Paper)({
  padding: "2rem",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
});

const StyledButton = styled(Button)({
  backgroundColor: "#1565c0",
  color: "#ffffff",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#0d47a1",
  },
});

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#1565c0",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#1565c0",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#cfd8dc",
    },
    "&:hover fieldset": {
      borderColor: "#90caf9",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1565c0",
    },
  },
});

const ResumeBuilder: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "",
    experience: "",
    skills: "",
    education: "",
    location: "",
    jobType: "",
    industry: "",
    certifications: "",
    languages: "",
    portfolio: "",
  });

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof ResumeData;
    setResumeData({ ...resumeData, [name]: event.target.value as string });
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Resume", 105, 10, { align: "center" });

    doc.setFontSize(12);
    const lineHeight = 10;
    const startY = 20;
    let currentY = startY;
    const marginRight = 190; // right margin for wrapping text

    const fields = [
      { label: "Full Name", value: resumeData.name },
      { label: "Experience", value: resumeData.experience },
      { label: "Skills", value: resumeData.skills },
      { label: "Education", value: resumeData.education },
      { label: "Preferred Location", value: resumeData.location },
      { label: "Job Type", value: resumeData.jobType },
      { label: "Industry", value: resumeData.industry },
      { label: "Certifications", value: resumeData.certifications },
      { label: "Languages", value: resumeData.languages },
      { label: "Portfolio", value: resumeData.portfolio },
    ];

    fields.forEach((field) => {
      const text = `${field.label}: ${field.value || "N/A"}`;
      const splitText = doc.splitTextToSize(text, marginRight);
      doc.text(splitText, 10, currentY);
      currentY += lineHeight * splitText.length;
    });

    doc.save("resume.pdf");
  };

  return (
    <StyledContainer maxWidth="md">
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{ color: "#0d47a1", fontWeight: "bold" }}
      >
        Build Your Resume
      </Typography>
      <StyledPaper elevation={3}>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Personal Information</AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={resumeData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="Years of Experience"
                    name="experience"
                    value={resumeData.experience}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Skills and Education</AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <StyledTextField
                    fullWidth
                    label="Key Skills"
                    name="skills"
                    value={resumeData.skills}
                    onChange={handleChange}
                    required
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="Education"
                    name="education"
                    value={resumeData.education}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Job Preferences</AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="Preferred Location"
                    name="location"
                    value={resumeData.location}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: "#1565c0" }}>Job Type</InputLabel>
                    <Select
                      name="jobType"
                      value={resumeData.jobType}
                      onChange={handleChange}
                      required
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#cfd8dc",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#90caf9",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#1565c0",
                        },
                      }}
                    >
                      <MenuItem value="full-time">Full-time</MenuItem>
                      <MenuItem value="part-time">Part-time</MenuItem>
                      <MenuItem value="contract">Contract</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="Industry"
                    name="industry"
                    value={resumeData.industry}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Certifications and Languages</AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="Certifications"
                    name="certifications"
                    value={resumeData.certifications}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    label="Languages"
                    name="languages"
                    value={resumeData.languages}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Portfolio</AccordionSummary>
            <AccordionDetails>
              <StyledTextField
                fullWidth
                label="Portfolio/Website"
                name="portfolio"
                value={resumeData.portfolio}
                onChange={handleChange}
              />
            </AccordionDetails>
          </Accordion>

          <StyledButton
            variant="contained"
            fullWidth
            onClick={handleDownloadPDF}
          >
            Download as PDF
          </StyledButton>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default ResumeBuilder;
