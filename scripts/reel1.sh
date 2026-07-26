#!/bin/bash

# Colors
G='\033[0;32m'
P='\033[0;35m'
B='\033[0;34m'
Y='\033[0;33m'
W='\033[1;37m'
D='\033[0;90m'
NC='\033[0m'

clear
echo ""
echo -e "${D}┌─────────────────────────────────────────────┐${NC}"
echo -e "${D}│${NC}  ${W}XMEL AUTOMATIONS${NC}                          ${D}│${NC}"
echo -e "${D}│${NC}  ${D}AI ISA Pipeline v2.4${NC}                      ${D}│${NC}"
echo -e "${D}└─────────────────────────────────────────────┘${NC}"
echo ""
sleep 0.5

echo -e "${G}▶ INCOMING LEAD${NC}"
echo -e "${D}  source:     website_form${NC}"
echo -e "${D}  name:       Priya Sharma${NC}"
echo -e "${D}  budget:     ₹85L — ₹1.2Cr${NC}"
echo -e "${D}  location:   Andheri West, Mumbai${NC}"
sleep 0.5
echo ""

echo -e "${P}▶ AI QUALIFYING...${NC}"
sleep 0.3
echo -e "  ${P}●${NC} Scoring lead intent..."
sleep 0.2
echo -e "  ${P}●${NC} Checking budget match..."
sleep 0.2
echo -e "  ${P}●${NC} Verifying location..."
sleep 0.2
echo -e "  ${P}●${NC} Cross-referencing CRM..."
sleep 0.3
echo -e "  ${W}Score: 87/100 → HIGH INTENT${NC}"
sleep 0.5
echo ""

echo -e "${B}▶ LIVE CHAT${NC}"
sleep 0.5
echo -e "  ${B}AI:${NC} Hey Priya! I see you're looking at Andheri West."
sleep 0.6
echo -e "     I have 3 properties matching your budget. Interested?${NC}"
sleep 0.8
echo ""
echo -e "  ${G}Priya:${NC} Yes! Can I see them this weekend?"
sleep 0.6
echo ""
echo -e "  ${B}AI:${NC} Perfect. I've booked Saturday 11 AM for a viewing."
sleep 0.6
echo -e "     Sending you the property shortlist now.${NC}"
sleep 0.8
echo ""

echo -e "${Y}▶ ROUTING...${NC}"
sleep 0.3
echo -e "  ${Y}●${NC} Calendar → slot reserved"
sleep 0.3
echo -e "  ${Y}●${NC} CRM → lead marked HOT"
sleep 0.3
echo -e "  ${Y}●${NC} Slack → alert sent"
sleep 0.3
echo -e "  ${Y}●${NC} Email → shortlist delivered"
sleep 0.6
echo ""

echo -e "${G}┌─────────────────────────────────────────────┐${NC}"
echo -e "${G}│${NC}  ${W}✓ LEAD HANDLED IN 47 SECONDS${NC}              ${G}│${NC}"
echo -e "${G}│${NC}  ${D}Appointment booked: Sat 11:00 AM${NC}          ${G}│${NC}"
echo -e "${G}└─────────────────────────────────────────────┘${NC}"
echo ""
